# Interactive Garden Home

An interactive digital-garden personal homepage. The project uses plain HTML, CSS, and JavaScript for the frontend modules, plus a lightweight Node.js server for static file hosting and a MySQL-backed gallery API.

[中文 README](./README.md)

## Highlights

- Interactive garden homepage with project seeds, gallery items, ability panels, contact actions, and a page mascot.
- Modular frontend structure with separated core utilities and feature modules.
- Gallery data can load from `/api/gallery` through MySQL, with a static local fallback when the API is unavailable.
- Built-in Node.js HTTP server with no extra web framework.
- Static checks and Node tests are included.

## Requirements

- Node.js 18 or newer
- npm
- Optional: MySQL 8 or a compatible database for dynamic gallery data

## Quick Start

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

The default local URL is `http://127.0.0.1:5173`. Without MySQL configuration, the page still renders the built-in static gallery data.

## Database Setup

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

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm start` | Start the application server |
| `npm run db:init` | Create and seed the gallery database table |
| `npm run check` | Check required files and static assets |
| `npm test` | Run Node tests |

## Project Structure

```text
.
├── index.html
├── package.json
├── scripts/
│   ├── check-static.mjs
│   ├── dev-server.mjs
│   └── init-gallery-db.mjs
├── src/
│   ├── core/
│   ├── data/
│   ├── features/
│   └── server/
├── static/
└── styles/
```

## Git Notes

The repository ignores `docs/`, `node_modules/`, `nodel_modules/`, `.edge-profile-desktop/`, `.superpowers/`, and local `.env` files.
