// 应用外壳：未配置 → 连接设置页；已配置 → 门户导航。中英双语，右上角按钮切换。
// 门户不读写数据、不做站内编辑；只链接各 app 现网址 + 写入共享 owner+token。

import { useState } from "preact/hooks";
import { loadConfig, isConfigured, type Config } from "./lib/store";
import { loadLang, saveLang, t, type Lang } from "./lib/i18n";
import { Connection } from "./ui/Connection";
import { Portal } from "./ui/Portal";

export function App() {
  const [cfg, setCfg] = useState<Config>(loadConfig());
  const [connected, setConnected] = useState<boolean>(isConfigured(loadConfig()));
  const [lang, setLangState] = useState<Lang>(loadLang());

  function toggleLang() {
    const next: Lang = lang === "zh" ? "en" : "zh";
    setLangState(next);
    saveLang(next);
  }

  // 回到连接设置页（不清令牌，值预填；如需清除用页内「清除本机令牌」）
  function openSettings() {
    setCfg(loadConfig());
    setConnected(false);
  }

  return (
    <>
      <header class="top">
        <span class="brand">
          <span class="ring">NL</span> {t("brand", lang)}
        </span>
        <span class="grow" />
        <button class="linkbtn" onClick={toggleLang} title="中文 / English" aria-label="language">
          {lang === "zh" ? "EN" : "中"}
        </button>
        {connected ? (
          <button class="linkbtn" onClick={openSettings}>
            {t("settings", lang)}
          </button>
        ) : (
          <span class="mono">{t("notConnected", lang)}</span>
        )}
      </header>

      {connected ? (
        <Portal lang={lang} />
      ) : (
        <Connection
          initial={cfg}
          lang={lang}
          onConnected={(c) => {
            setCfg(c);
            setConnected(true);
          }}
        />
      )}
    </>
  );
}
