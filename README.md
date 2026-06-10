# Interactive Garden Home

**Language / 语言:** [中文](#中文) | [English](#english)

<a id="中文"></a>

## 中文

一个互动数字花园风格的个人展示首页。项目使用原生 HTML、CSS 和 JavaScript 组织前端模块，并提供一个轻量 Node.js 服务端，用于静态资源托管和 MySQL 图库接口。

[Back to top / 回到顶部](#interactive-garden-home)

### 功能亮点

- 互动花园首页，包含项目种子、作品画廊、能力温室、联系方式和页面宠物。
- 模块化前端结构，核心能力与功能模块分离，便于继续扩展。
- 图库支持从 `/api/gallery` 加载 MySQL 数据，并在接口不可用时回退到本地静态数据。
- Node.js 内置 HTTP 服务，无需额外 Web 框架。
- 附带静态检查和 Node 测试。

### 环境要求

- Node.js 18 或更高版本
- npm
- 可选：MySQL 8 或兼容版本，用于动态图库数据

### 快速开始

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

默认服务地址是 `http://127.0.0.1:5173`。如果没有配置 MySQL，页面仍会展示内置的静态图库数据。

### 配置数据库

编辑 `.env`：

```ini
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=123456
DB_NAME=myweb
PORT=5173
```

初始化图库数据：

```powershell
npm run db:init
```

然后启动服务：

```powershell
npm run dev
```

### 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动本地开发服务器 |
| `npm start` | 启动应用服务器 |
| `npm run db:init` | 创建并初始化图库数据库表 |
| `npm run check` | 检查关键文件和静态资源 |
| `npm test` | 运行 Node 测试 |

### 项目结构

```text
.
|-- index.html
|-- package.json
|-- scripts/
|   |-- check-static.mjs
|   |-- dev-server.mjs
|   `-- init-gallery-db.mjs
|-- src/
|   |-- core/
|   |-- data/
|   |-- features/
|   `-- server/
|-- static/
`-- styles/
```

### 提交说明

仓库会忽略 `docs/`、`node_modules/`、`nodel_modules/`、`.edge-profile-desktop/`、`.superpowers/` 和本地 `.env` 文件。

<a id="english"></a>

## English

An interactive digital-garden personal homepage. The project uses plain HTML, CSS, and JavaScript for the frontend modules, plus a lightweight Node.js server for static file hosting and a MySQL-backed gallery API.

[Back to top / 回到顶部](#interactive-garden-home)

### Highlights

- Interactive garden homepage with project seeds, gallery items, ability panels, contact actions, and a page mascot.
- Modular frontend structure with separated core utilities and feature modules.
- Gallery data can load from `/api/gallery` through MySQL, with a static local fallback when the API is unavailable.
- Built-in Node.js HTTP server with no extra web framework.
- Static checks and Node tests are included.

### Requirements

- Node.js 18 or newer
- npm
- Optional: MySQL 8 or a compatible database for dynamic gallery data

### Quick Start

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

The default local URL is `http://127.0.0.1:5173`. Without MySQL configuration, the page still renders the built-in static gallery data.

### Database Setup

Edit `.env`:

```ini
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=123456
DB_NAME=myweb
PORT=5173
```

Initialize the gallery data:

```powershell
npm run db:init
```

Then start the server:

```powershell
npm run dev
```

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm start` | Start the application server |
| `npm run db:init` | Create and seed the gallery database table |
| `npm run check` | Check required files and static assets |
| `npm test` | Run Node tests |

### Project Structure

```text
.
|-- index.html
|-- package.json
|-- scripts/
|   |-- check-static.mjs
|   |-- dev-server.mjs
|   `-- init-gallery-db.mjs
|-- src/
|   |-- core/
|   |-- data/
|   |-- features/
|   `-- server/
|-- static/
`-- styles/
```

### Git Notes

The repository ignores `docs/`, `node_modules/`, `nodel_modules/`, `.edge-profile-desktop/`, `.superpowers/`, and local `.env` files.
