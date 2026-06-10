# Gallery Database Design

## Goal

Move the gallery feature from static frontend data to a backend API backed by MySQL, while keeping static fallback behavior when the API or database is unavailable.

## Design

The app keeps its native ES module frontend. A Node HTTP server serves the static site and exposes `GET /api/gallery`. The API reads published gallery records from MySQL and returns `{ "items": [...] }`.

Local development defaults to:

- Host: `127.0.0.1`
- Port: `3306`
- User: `root`
- Password: `123456`
- Database: `myweb`

Cloud database migration only requires environment variable changes.

## Data Flow

1. `src/features/gallery/index.js` renders existing static gallery data immediately.
2. `src/features/gallery/galleryApi.js` requests `/api/gallery`.
3. If the API succeeds, the gallery rerenders with database data.
4. If the API fails, the static fallback remains visible.

## Database

Table: `gallery_items`

Fields:

- `id`
- `slug`
- `title`
- `type`
- `description`
- `visual`
- `image_url`
- `sort_order`
- `is_published`
- `created_at`
- `updated_at`

## Commands

- `npm install`
- `npm run db:init`
- `npm run dev`
- `npm test`
