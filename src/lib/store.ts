// 共享连接配置 —— 同 origin 下导航站与 10 个 app 共用的单一键 pha-config。
// 统一口径：共享 owner + repo + token；各 app 自己的数据文件路径(path)保留不动。
// 这样新设备上各 app 能自动取到仓库与令牌，不再弹「填仓库名」的设置框。
// 令牌只存本设备浏览器，绝不进仓库 / 硬编码 / 明文产物。

export interface Config {
  owner: string;
  /** 数据仓库名（10 个库都在 NickkkLian/Database） */
  repo: string;
  /** fine-grained PAT，授权数据库仓库、Contents 读写 */
  token: string;
}

const KEY = "pha-config";

const DEFAULTS: Config = {
  owner: "NickkkLian",
  repo: "Database",
  token: "",
};

export function loadConfig(): Config {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULTS };
    const parsed = JSON.parse(raw) as Partial<Config>;
    return { ...DEFAULTS, ...parsed };
  } catch {
    return { ...DEFAULTS };
  }
}

export function saveConfig(cfg: Config): void {
  localStorage.setItem(KEY, JSON.stringify(cfg));
}

export function clearConfig(): void {
  localStorage.removeItem(KEY);
}

/** 是否已具备共享给各 app 的最小信息（repo 有默认值，故只校验 owner + token） */
export function isConfigured(cfg: Config): boolean {
  return Boolean(cfg.owner && cfg.token);
}
