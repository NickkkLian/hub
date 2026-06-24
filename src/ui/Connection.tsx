// 连接设置页：一次性填 owner + 令牌，存共享键 pha-config（本机 localStorage）。
// 同 origin 下的各 app 会自动读到它，无需逐个再配。令牌只存本设备，不上传、不进仓库。中英双语。

import { useState } from "preact/hooks";
import { type Config, saveConfig, clearConfig } from "../lib/store";
import { validateToken } from "../lib/github";
import { t, type Lang } from "../lib/i18n";

interface Props {
  initial: Config;
  lang: Lang;
  onConnected: (cfg: Config) => void;
}

export function Connection({ initial, lang, onConnected }: Props) {
  const [owner, setOwner] = useState(initial.owner);
  const [repo, setRepo] = useState(initial.repo || "Database");
  const [token, setToken] = useState(initial.token);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: string; text: string }>({ kind: "", text: "" });

  async function connect() {
    const o = owner.trim();
    const r = repo.trim() || "Database";
    const tk = token.trim();
    if (!o || !tk) {
      setMsg({ kind: "err", text: t("fillOwnerToken", lang) });
      return;
    }
    setBusy(true);
    setMsg({ kind: "", text: t("verifying", lang) });
    const res = await validateToken(o, tk);
    setBusy(false);
    if (!res.ok) {
      setMsg({ kind: "err", text: res.error || t("verifyFail", lang) });
      return;
    }
    saveConfig({ owner: o, repo: r, token: tk });
    if (res.warning) {
      setMsg({ kind: "warn", text: res.warning + t("savedContinue", lang) });
    } else {
      setMsg({ kind: "ok", text: t("validSaved", lang) });
    }
    onConnected({ owner: o, repo: r, token: tk });
  }

  function forget() {
    clearConfig();
    setToken("");
    setMsg({ kind: "warn", text: t("cleared", lang) });
  }

  return (
    <main>
      <h1 class="page">{t("connTitle", lang)}</h1>
      <p class="hint">
        {lang === "zh" ? (
          <>
            填一次 GitHub 用户名和一个 <b>Contents 读写</b> 令牌。它会存进本设备的共享配置，
            同站点下的各数据库 app 会<b>自动读到</b>，无需逐个再配。令牌只存这台设备的浏览器，
            不上传、不进任何代码仓库。
          </>
        ) : (
          <>
            Enter your GitHub username and one token with <b>Contents read/write</b> once. It is saved to
            this device's shared config and every database app on this site <b>reads it automatically</b> —
            no per-app setup. The token stays in this browser only; never uploaded, never in any repo.
          </>
        )}
      </p>

      <div class="card">
        <label class="mono">{t("ownerLabel", lang)}</label>
        <input
          type="text"
          value={owner}
          placeholder="NickkkLian"
          autocapitalize="off"
          autocorrect="off"
          onInput={(e) => setOwner((e.target as HTMLInputElement).value)}
        />

        <label class="mono">{t("repoLabel", lang)}</label>
        <input
          type="text"
          value={repo}
          placeholder="Database"
          autocapitalize="off"
          autocorrect="off"
          onInput={(e) => setRepo((e.target as HTMLInputElement).value)}
        />

        <label class="mono">{t("tokenLabel", lang)}</label>
        <input
          type="password"
          value={token}
          placeholder="github_pat_…"
          autocapitalize="off"
          autocorrect="off"
          onInput={(e) => setToken((e.target as HTMLInputElement).value)}
        />

        <div class="row" style="margin-top:1rem">
          <button class="btn primary" onClick={connect} disabled={busy}>
            {t("verifySave", lang)}
          </button>
          <button class="btn" onClick={forget} disabled={busy}>
            {t("clearToken", lang)}
          </button>
          <span class="grow" />
          <span class={"status " + msg.kind}>{msg.text}</span>
        </div>
      </div>

      <p class="hint">
        {lang === "zh" ? (
          <>
            令牌生成：GitHub → Settings → Developer settings → Fine-grained tokens →
            勾选需要的数据库仓库，Repository permissions 里把 <b>Contents</b> 设为
            <b> Read and write</b>。详细图文见 README。
          </>
        ) : (
          <>
            Create a token: GitHub → Settings → Developer settings → Fine-grained tokens → select the
            database repo(s), and under Repository permissions set <b>Contents</b> to
            <b> Read and write</b>. See the README for a step-by-step guide.
          </>
        )}
      </p>
    </main>
  );
}
