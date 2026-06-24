// 门户首页：各数据库 app 的导航卡片。点选在新标签页顶层打开现网址。
// 同 origin，所以打开后各 app 自动读到共享的 owner+token。中英双语随父级 lang。

import { REGISTRY } from "../lib/registry";
import { t, type Lang } from "../lib/i18n";

export function Portal({ lang }: { lang: Lang }) {
  return (
    <main>
      <h1 class="page">{t("portalTitle", lang)}</h1>
      <p class="hint">
        {lang === "zh" ? (
          <>
            共 {REGISTRY.length} 个库。已在「连接设置」里配好令牌，点开任意 app 都无需再单独登录。
          </>
        ) : (
          <>
            {REGISTRY.length} apps. The token is set in Settings — open any app, no separate login.
          </>
        )}
      </p>
      <div class="grid">
        {REGISTRY.map((app) => (
          <a class="dbcard" key={app.id} href={app.url} target="_blank" rel="noopener">
            <span class="ico">{app.icon}</span>
            <span class="name">{lang === "zh" ? app.label : app.labelEn}</span>
            <span class="blurb">{lang === "zh" ? app.blurb : app.blurbEn}</span>
            <span class="fpath">{app.repo} ↗</span>
          </a>
        ))}
      </div>
    </main>
  );
}
