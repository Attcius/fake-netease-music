# AGENTS.md

## 核心原则

**注释简单、高效、直接。全项目遵循，包括本文件。**

- 只写「为什么」，不写「做什么」—— 代码本身已经说清楚做什么
- 只给反直觉的、易踩坑的、临时方案写注释，其余不写
- **不逐行写注释，一个模块写一次就够**，能靠命名和结构看懂的不写
- 不写废话注释：`// 设置状态`、`// 渲染列表`、`// 遍历数组`
- 不留注释掉的死代码，直接删
- 中文注释，一行为主；待办用 `TODO`
- 宁可不写，也不写废话

反例（不要这样写）：

```tsx
// 创建一个 state 用来保存计数
const [count, setCount] = useState(0)

// 遍历数组渲染列表
items.map((item) => <li key={item.id}>{item.name}</li>)
```

正例（只在必要时写）：

```tsx
// 音量存 localStorage，刷新后要恢复上次值
volume: 1,
```

## 项目

仿网易云音乐 Web 播放器。学习项目，跟视频同步进度。

技术栈与视频不同，本项目用 Vite + Zustand，视频用 CRA + Redux：

| 项 | 选型 |
| --- | --- |
| 框架 | React 19（函数组件 + Hooks） |
| 构建 | Vite 8（**不要**用CRA 相关方案） |
| 语言 | TypeScript，`tsconfig.app.json` |
| 样式 | **Less，全局样式**（非 CSS Modules），主题色用 CSS 变量 |
| 路由 | react-router-dom 7（Library 模式，`createBrowserRouter`） |
| 状态 | Zustand（非 Redux） |
| 规范 | ESLint 10 flat config + typescript-eslint |

## 命令

```bash
npm run dev      # 开发
npm run build    # tsc -b 类型检查 + 构建，提交前必跑
npm run lint     # ESLint
```

## 目录

```
src/
├── main.tsx           入口：挂载 RouterProvider，按顺序导入全局样式
├── index.less         全局 CSS 变量（主题色）
├── router/index.tsx   路由配置
├── styles/reset.less  全局重置
├── views/             页面组件，每个页面一个目录
├── components/        可复用组件
├── hooks/             自定义 Hook
├── base-ui/           无样式基础组件
└── utils/             纯函数
```

## 约定

- **样式是全局 Less**，不用 CSS Modules。页面类名统一加页面前缀（`discover-page`、`player-list`），防止跨页面撞名
- **主题色用 CSS 变量**（`var(--color-primary)`），不用 Less 变量 —— 避免 Less 的 `@` 与将来 `@` 路径别名冲突
- **组件私有样式放页面自己的 `.less` 里**，用 `&` 嵌套减少重复前缀
- 类型导入写 `import type { X }`（`verbatimModuleSyntax` 已开启）
- 未使用的变量/参数会导致 build 失败，写完检查一遍

## 踩过的坑

**Less 里颜色函数必须用逗号分隔**

```less
box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);  // ✓
box-shadow: 0 6px 16px rgb(0 0 0 / 12%);     // ✗ Less 当内置函数，解析报错
```

**Less 里不能写 `@import '@/xxx.less'`**：`@` 会被当成变量起始符，用相对路径。

**Less 报 "Could not parse call arguments" 时**：先查颜色函数和 `var()`，多数是括号或参数格式问题。

**生产环境 SPA 404**：`createBrowserRouter` 走 History API，服务器需回退到 `index.html`（nginx 用 `try_files $uri $uri/ /index.html;`），否则上线刷新子路由全挂。

**Node 版本**：Vite 8 要求 `^20.19|| ^22.13 || >=24`，用23 会有警告。

## 待确认

需求不明确时先问，不要自行假设：

- 布局层（侧边栏 / 顶部搜索栏）是否用 `Layout` + `<Outlet/>`，当前页面是占满视口的
- 接口来源：网易云官方接口、mock 服务，还是本地假数据
- 播放方案：`<audio>` 元素还是 Web Audio API