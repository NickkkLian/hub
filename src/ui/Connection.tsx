// 连接设置页：一次性填 owner + 令牌，存共享键 pha-config（本机 localStorage）。
// 同 origin 下的 10 个 app 会自动读到它，无需逐个再配。令牌只存本设备，不上传、不进仓库。

import { useState } from "preact/hooks";
import { type Config, saveConfig, clearConfig } from "../lib/store";
import { validateToken } from "../lib/github";

interface Props {
  initial: Config;
  onConnected: (cfg: Config) => void;
}

export function Connection({ initial, onConnected }: Props) {
  const [owner, setOwner] = useState(initial.owner);
  const [repo, setRepo] = useState(initial.repo || "Database");
  const [token, setToken] = useState(initial.token);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: string; text: string }>({ kind: "", text: "" });

  async function connect() {
    const o = owner.trim();
    const r = repo.trim() || "Database";
    const t = token.trim();
    if (!o || !t) {
      setMsg({ kind: "err", text: "请填写 Owner 和 Token" });
      return;
    }
    setBusy(true);
    setMsg({ kind: "", text: "正在验证令牌…" });
    const res = await validateToken(o, t);
    setBusy(false);
    if (!res.ok) {
      setMsg({ kind: "err", text: res.error || "校验失败" });
      return;
    }
    saveConfig({ owner: o, repo: r, token: t });
    if (res.warning) {
      setMsg({ kind: "warn", text: res.warning + " 已保存，仍可继续。" });
    } else {
      setMsg({ kind: "ok", text: "令牌有效 ✓ 已保存，各 app 现在共用它。" });
    }
    onConnected({ owner: o, repo: r, token: t });
  }

  function forget() {
    clearConfig();
    setToken("");
    setMsg({ kind: "warn", text: "已清除本机令牌（各 app 下次需重新获得）。" });
  }

  return (
    <main>
      <h1 class="page">连接设置</h1>
      <p class="hint">
        填一次 GitHub 用户名和一个 <b>Contents 读写</b> 令牌。它会存进本设备的共享配置，
        同站点下的 10 个数据库 app 会<b>自动读到</b>，无需逐个再配。令牌只存这台设备的浏览器，
        不上传、不进任何代码仓库。
      </p>

      <div class="card">
        <label class="mono">Owner（GitHub 用户名）</label>
        <input
          type="text"
          value={owner}
          placeholder="NickkkLian"
          autocapitalize="off"
          autocorrect="off"
          onInput={(e) => setOwner((e.target as HTMLInputElement).value)}
        />

        <label class="mono">Repo（数据仓库名 · 一般不用改）</label>
        <input
          type="text"
          value={repo}
          placeholder="Database"
          autocapitalize="off"
          autocorrect="off"
          onInput={(e) => setRepo((e.target as HTMLInputElement).value)}
        />

        <label class="mono">Token（fine-grained PAT）</label>
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
            验证并保存
          </button>
          <button class="btn" onClick={forget} disabled={busy}>
            清除本机令牌
          </button>
          <span class="grow" />
          <span class={"status " + msg.kind}>{msg.text}</span>
        </div>
      </div>

      <p class="hint">
        令牌生成：GitHub → Settings → Developer settings → Fine-grained tokens →
        勾选需要的数据库仓库，Repository permissions 里把 <b>Contents</b> 设为
        <b> Read and write</b>。详细图文见 README。
      </p>
    </main>
  );
}
