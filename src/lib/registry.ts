// 门户注册表 —— 站长在 GitHub Pages 上已部署的 11 个数据库 / 工具 web app。
// 全部在 https://nickkklian.github.io 同一 origin 下，因此与导航站共享同一份 localStorage。
// 导航站不读写数据、不碰各 app 的 repo/path；只负责链接它们 + 写入共享 owner/token。

export interface AppLink {
  /** 内部标识 */
  id: string;
  /** 对应 GitHub 仓库名（= Pages 路径） */
  repo: string;
  /** 卡片标题 */
  label: string;
  /** 一句话说明 */
  blurb: string;
  /** 卡片图标（emoji，零依赖） */
  icon: string;
  /** 现网址（顶层打开） */
  url: string;
}

const BASE = "https://nickkklian.github.io";
const at = (repo: string) => `${BASE}/${repo}/`;

export const REGISTRY: AppLink[] = [
  {
    id: "develop",
    repo: "Development-Log",
    label: "开发日志",
    blurb: "项目与开发记录台账",
    icon: "🛠️",
    url: at("Development-Log"),
  },
  {
    id: "writing",
    repo: "Creation-Ideas",
    label: "创意 / 写作",
    blurb: "创意想法库 · 写作",
    icon: "✍️",
    url: at("Creation-Ideas"),
  },
  {
    id: "investment",
    repo: "Investment-Info",
    label: "投资情报",
    blurb: "情报终端 · 持仓与资讯",
    icon: "📈",
    url: at("Investment-Info"),
  },
  {
    id: "life",
    repo: "Life-Atlas",
    label: "生活",
    blurb: "旅居与吃喝记录",
    icon: "🌿",
    url: at("Life-Atlas"),
  },
  {
    id: "business",
    repo: "Business-Lab",
    label: "选题实验室",
    blurb: "选题与项目实验室",
    icon: "💼",
    url: at("Business-Lab"),
  },
  {
    id: "knowledge",
    repo: "Knowledge-Atlas",
    label: "知识图谱",
    blurb: "第二大脑 · 知识管理",
    icon: "📚",
    url: at("Knowledge-Atlas"),
  },
  {
    id: "menu",
    repo: "My-Menu",
    label: "菜单",
    blurb: "菜谱 / 调酒 / 烘焙",
    icon: "🍽️",
    url: at("My-Menu"),
  },
  {
    id: "mind",
    repo: "Mind-Archive",
    label: "思维库",
    blurb: "想法与念头归档",
    icon: "🧠",
    url: at("Mind-Archive"),
  },
  {
    id: "mystery",
    repo: "Mystery-Trick-Archive",
    label: "诡计逻辑库",
    blurb: "推理诡计 / 概念归档",
    icon: "🔮",
    url: at("Mystery-Trick-Archive"),
  },
  {
    id: "album",
    repo: "Album-Journal",
    label: "专辑收藏",
    blurb: "音乐专辑 / 唱片收藏",
    icon: "💿",
    url: at("Album-Journal"),
  },
  {
    id: "xhs",
    repo: "xhs-organizer",
    label: "小红书整理",
    blurb: "图文整理 · 自动分类收藏",
    icon: "📕",
    url: at("xhs-organizer"),
  },
];
