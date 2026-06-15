# Personal Hub · 数据库导航台（门户）

NickkkLian 的个人数据库**门户/启动页**。纯静态单页应用(Vite + TypeScript + Preact)。
它只做两件事:

1. **导航** —— 一个首页列出 10 个数据库 web app,点卡片在新标签页打开它们的现网址。
2. **一次配置、各 app 共用令牌** —— 在「连接设置」里填一次 GitHub 用户名 + 令牌,存进本设备的共享配置 `pha-config`。因为导航台和 10 个 app 都在同一个 `nickkklian.github.io` 域名下(同 origin,localStorage 共享),各 app 会自动读到这份令牌,**令牌过期换新时只需在这里改一次,不用逐个 app 重填**。

> 私有后台,页面带 `noindex`。令牌只存这台设备的浏览器,绝不进代码、不进构建产物、不上传。

---

## 核心原理:为什么「配一次,各 app 共用」

浏览器 localStorage 按 **origin(域名)** 隔离,与路径无关。NickkkLian 账号下所有 GitHub Pages
project 站点都在 `https://nickkklian.github.io` 这同一个 origin 下,所以:

- 把本导航台也部署成该账号下一个仓库的 Pages(落在 `https://nickkklian.github.io/<仓库名>/`),
- 它写进 `pha-config` 的 `{owner, token}` 就和 10 个 app 共享同一份 localStorage,
- 各 app 加了一小段「令牌为空时从 `pha-config` 读 owner+token」的引导,于是自动拿到令牌。

**共享范围:owner + repo + token**(repo 默认 `Database`,10 个库都在这个仓库)。各 app
自己的**数据文件路径(path)保留不动**。补丁逻辑是「仅填空缺、绝不覆盖已自填的值」,所以新设备上
各 app 自动取到仓库与令牌、不再弹「填仓库名」的设置框;老设备已配好的不受影响。
(Mystery 顺带修正了一处历史错误默认路径 `data.json`→`mystery.json`,即真实数据文件。)

---

## 收录的 10 个 app(均已在线,实测)

| 库 | 仓库 = Pages 路径 | 网址 |
|---|---|---|
| 开发日志 | Development-Log | https://nickkklian.github.io/Development-Log/ |
| 创意 / 写作 | Creation-Ideas | https://nickkklian.github.io/Creation-Ideas/ |
| 投资情报 | Investment-Info | https://nickkklian.github.io/Investment-Info/ |
| 生活 | Life-Atlas | https://nickkklian.github.io/Life-Atlas/ |
| 选题实验室 | Business-Lab | https://nickkklian.github.io/Business-Lab/ |
| 知识图谱 | Knowledge-Atlas | https://nickkklian.github.io/Knowledge-Atlas/ |
| 菜单 | My-Menu | https://nickkklian.github.io/My-Menu/ |
| 思维库 | Mind-Archive | https://nickkklian.github.io/Mind-Archive/ |
| 诡计逻辑库 | Mystery-Trick-Archive | https://nickkklian.github.io/Mystery-Trick-Archive/ |
| 专辑收藏 | Album-Journal | https://nickkklian.github.io/Album-Journal/ |

> 求职追踪(Job Tracker)按站长决定**不纳入**(它有独立 Pages + jobapp-data 仓库)。
> 网址清单内置在 `src/lib/registry.ts`。

---

## 本地预览 / 构建

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 类型检查 + 打包到 dist/(纯静态,零密钥)
npm run preview
```

---

## 部署导航台(关键:必须落在 nickkklian.github.io 同 origin)

1. 在 **NickkkLian 账号**下新建一个仓库(建议名 `database-combined`,网址就会是 `https://nickkklian.github.io/database-combined/`)。
2. 把本项目代码推上去。
3. 用 GitHub Actions 构建发布 `dist/`(见下方 workflow),或本地 `npm run build` 后把 `dist/` 内容推到 `gh-pages` 分支。
4. 仓库 Settings → Pages 开启。`vite.config.ts` 已用相对 `base`,放子路径能正常跑。

> ⚠️ 不要把导航台部署到 Cloudflare / 自定义域名 —— 那是另一个 origin,令牌共享会失效。
> 必须和 10 个 app 同在 `nickkklian.github.io`。

示例 `.github/workflows/deploy.yml`(推到 `main` 即自动发布 Pages):

```yaml
name: deploy
on:
  push: { branches: [main] }
permissions: { contents: read, pages: write, id-token: write }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci && npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages }
    steps:
      - uses: actions/deploy-pages@v4
```

---

## 各 app 的「读共享令牌」补丁

10 个 app 各加了一段附加引导(注释标记 `[hub-portal]`),逻辑:从 `pha-config`
**补全 owner+repo+token 中缺失的项**;已自填的绝不覆盖;不碰各 app 的数据路径。
补丁清单(每个文件 1 处):

| 仓库 | 改的文件 | 插入位置 | 写入方式 |
|---|---|---|---|
| Development-Log | index.html | init() 读完自身配置后 | 仅内存 |
| Investment-Info | index.html | loadCfg() 内 | 仅内存 |
| Album-Journal | index.html | loadGHConfig() 内 | 仅内存 |
| My-Menu | index.html | 启动自动重连读 menu_cfg 后 | 仅内存 |
| Business-Lab | index.html | loadLocal() 读 state.gh 后 | 仅内存 |
| Creation-Ideas | index.html | loadSettings() 内 | 仅内存 |
| Life-Atlas | index.html | state 初始化后 | 仅内存 |
| Knowledge-Atlas | index.html | 载入 kb_github 后 | 仅内存 |
| Mystery-Trick-Archive | index.html | 载入 mtrick_cfg 后 | 仅内存 |
| Mind-Archive | index.html | cfg 取值器定义后 | 写入自身 ma_token/ma_user 键 |

> 补丁已推送各 app 仓库 main 并上线(同 origin 环境实测通过:令牌自动拾取、repo/path
> 不变、已填不覆盖、原功能不受影响)。本地副本也在 `~/Desktop/hub-apps/<App>/index.html`。

---

## 项目结构

```
src/
  lib/
    registry.ts   10 个 app 的名称 / 仓库 / 网址
    store.ts      共享配置读写(localStorage 键 pha-config = {owner, token})
    github.ts     令牌校验(GET /user)
  ui/
    Connection.tsx  连接设置页(owner + token)
    Portal.tsx      门户导航网格(卡片链到现网址)
    styles.css      移动优先 + iPhone 安全区适配
  app.tsx           应用外壳
  main.tsx          入口
```
