// 门户中英双语词典 + 语言读写。
// 语言存共享键 pha-lang（同 origin 与各数据库 app 联动），默认中文。
// 专有名词/品牌（GitHub / Token / Owner / Repo / PAT）保留不译。

export type Lang = "zh" | "en";

const LANG_KEY = "pha-lang";

export function loadLang(): Lang {
  try {
    return localStorage.getItem(LANG_KEY) === "en" ? "en" : "zh";
  } catch {
    return "zh";
  }
}

export function saveLang(lang: Lang): void {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* 隐私模式等忽略 */
  }
}

type Entry = { zh: string; en: string };

const DICT: Record<string, Entry> = {
  brand: { zh: "数据库导航台", en: "Database Hub" },
  settings: { zh: "连接设置", en: "Settings" },
  notConnected: { zh: "未连接", en: "Not connected" },
  portalTitle: { zh: "数据库导航", en: "My Databases" },
  connTitle: { zh: "连接设置", en: "Connection" },
  ownerLabel: { zh: "Owner（GitHub 用户名）", en: "Owner (GitHub username)" },
  repoLabel: { zh: "Repo（数据仓库名 · 一般不用改）", en: "Repo (data repo · usually keep)" },
  tokenLabel: { zh: "Token（fine-grained PAT）", en: "Token (fine-grained PAT)" },
  fillOwnerToken: { zh: "请填写 Owner 和 Token", en: "Please fill in Owner and Token" },
  verifySave: { zh: "验证并保存", en: "Verify & save" },
  verifying: { zh: "正在验证令牌…", en: "Verifying token…" },
  validSaved: {
    zh: "令牌有效 ✓ 已保存，各 app 现在共用它。",
    en: "Token valid ✓ saved — all apps share it now.",
  },
  verifyFail: { zh: "校验失败", en: "Verification failed" },
  clearToken: { zh: "清除本机令牌", en: "Clear token" },
  cleared: {
    zh: "已清除本机令牌（各 app 下次需重新获得）。",
    en: "Token cleared (apps will need it again).",
  },
  savedContinue: { zh: " 已保存，仍可继续。", en: " Saved, you can continue." },
};

export function t(key: string, lang: Lang): string {
  const e = DICT[key];
  return e ? e[lang] : key;
}
