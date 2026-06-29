// 门户注册表 —— 站长已部署的数据库 / 工具 web app + 个人网站后台。
// 数据库 app 全部在 https://nickkklian.github.io 同一 origin 下，与导航站共享同一份 localStorage（owner/token）。
// 个人网站后台在 Cloudflare Pages（不同 origin，不共享令牌、有自己的登录）——仅作链接跳转。
// 导航站不读写数据、不碰各 app 的 repo/path；只负责链接它们 + 写入共享 owner/token。

export interface AppLink {
  /** 内部标识 */
  id: string;
  /** 对应 GitHub 仓库名（= Pages 路径） */
  repo: string;
  /** 卡片标题（中文） */
  label: string;
  /** 卡片标题（英文） */
  labelEn: string;
  /** 一句话说明（中文） */
  blurb: string;
  /** 一句话说明（英文） */
  blurbEn: string;
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
    labelEn: "Dev Log",
    blurb: "项目与开发记录台账",
    blurbEn: "Project & dev log",
    icon: "🛠️",
    url: at("Development-Log"),
  },
  {
    id: "writing",
    repo: "Creation-Ideas",
    label: "创意 / 写作",
    labelEn: "Ideas & Writing",
    blurb: "创意想法库 · 写作",
    blurbEn: "Idea vault · writing",
    icon: "✍️",
    url: at("Creation-Ideas"),
  },
  {
    id: "investment",
    repo: "Investment-Info",
    label: "投资情报",
    labelEn: "Investment",
    blurb: "情报终端 · 持仓与资讯",
    blurbEn: "Intel desk · holdings & news",
    icon: "📈",
    url: at("Investment-Info"),
  },
  {
    id: "life",
    repo: "Life-Atlas",
    label: "生活",
    labelEn: "Life",
    blurb: "旅居与吃喝记录",
    blurbEn: "Travel & food log",
    icon: "🌿",
    url: at("Life-Atlas"),
  },
  {
    id: "business",
    repo: "Business-Lab",
    label: "选题实验室",
    labelEn: "Idea Lab",
    blurb: "选题与项目实验室",
    blurbEn: "Topics & projects lab",
    icon: "💼",
    url: at("Business-Lab"),
  },
  {
    id: "knowledge",
    repo: "Knowledge-Atlas",
    label: "知识图谱",
    labelEn: "Knowledge",
    blurb: "第二大脑 · 知识管理",
    blurbEn: "Second brain · knowledge",
    icon: "📚",
    url: at("Knowledge-Atlas"),
  },
  {
    id: "menu",
    repo: "My-Menu",
    label: "菜单",
    labelEn: "Menu",
    blurb: "菜谱 / 调酒 / 烘焙",
    blurbEn: "Recipes / cocktails / baking",
    icon: "🍽️",
    url: at("My-Menu"),
  },
  {
    id: "mind",
    repo: "Mind-Archive",
    label: "思维库",
    labelEn: "Mind",
    blurb: "想法与念头归档",
    blurbEn: "Thoughts & ideas archive",
    icon: "🧠",
    url: at("Mind-Archive"),
  },
  {
    id: "mystery",
    repo: "Mystery-Trick-Archive",
    label: "诡计逻辑库",
    labelEn: "Mystery Tricks",
    blurb: "推理诡计 / 概念归档",
    blurbEn: "Detective tricks & concepts",
    icon: "🔮",
    url: at("Mystery-Trick-Archive"),
  },
  {
    id: "album",
    repo: "Album-Journal",
    label: "专辑收藏",
    labelEn: "Albums",
    blurb: "音乐专辑 / 唱片收藏",
    blurbEn: "Music albums & records",
    icon: "💿",
    url: at("Album-Journal"),
  },
  {
    id: "xhs",
    repo: "xhs-organizer",
    label: "小红书整理",
    labelEn: "XHS Organizer",
    blurb: "图文整理 · 自动分类收藏",
    blurbEn: "Posts · auto-categorize & save",
    icon: "📕",
    url: at("xhs-organizer"),
  },
  {
    id: "bili",
    repo: "bilibili-organizer",
    label: "B站归档",
    labelEn: "Bilibili Archive",
    blurb: "视频整理 · 按分区归档",
    blurbEn: "Videos · archive by category",
    icon: "📺",
    url: at("bilibili-organizer"),
  },
  {
    id: "storage",
    repo: "Storage-Tracker",
    label: "暂存库存",
    labelEn: "Stash",
    blurb: "各处暂存物品 · 地址/数量/图片",
    blurbEn: "Stored items · address/qty/photos",
    icon: "📦",
    url: at("Storage-Tracker"),
  },
  {
    id: "jobtracker",
    repo: "Job-Tracker",
    label: "求职追踪",
    labelEn: "Job Tracker",
    blurb: "多地区投递 · 简历模板 · AI 工具",
    blurbEn: "Multi-region apply · resume templates · AI",
    icon: "💼",
    url: at("Job-Tracker"),
  },
  {
    id: "siteadmin",
    repo: "personal-hub",
    label: "网站后台",
    labelEn: "Site Admin",
    blurb: "个人网站 · 文案/字体编辑（独立登录）",
    blurbEn: "Personal site · text & fonts editor (own login)",
    icon: "🎛️",
    url: "https://personal-hub-7uc.pages.dev/admin",
  },
];
