# Gallery Database Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Back the gallery feature with a MySQL API while keeping frontend fallback data.

**Architecture:** Add a Node HTTP server that serves static assets and `/api/gallery`. Add MySQL config, repository mapping, database initialization, and a frontend API loader with fallback.

**Tech Stack:** Node.js ES modules, native `node:test`, MySQL via `mysql2`.

---

### Task 1: Tests

**Files:**
- Create: `scripts/__tests__/server-config.test.mjs`
- Create: `scripts/__tests__/gallery-repository.test.mjs`
- Create: `scripts/__tests__/gallery-api.test.mjs`

- [ ] Add tests for database config defaults and environment overrides.
- [ ] Add tests for mapping MySQL rows into gallery API items.
- [ ] Add tests for frontend gallery loading from API and falling back to static data.
- [ ] Run `node --test scripts/__tests__/*.test.mjs` and verify the tests fail because implementation files do not exist.

### Task 2: Server And Database

**Files:**
- Create: `src/server/config.mjs`
- Create: `src/server/db.mjs`
- Create: `src/server/galleryRepository.mjs`
- Create: `src/server/server.mjs`
- Create: `scripts/init-gallery-db.mjs`

- [ ] Implement env-driven database config with local defaults.
- [ ] Implement MySQL connection creation with `mysql2/promise`.
- [ ] Implement `gallery_items` schema initialization and seed data from `profile.js`.
- [ ] Implement `GET /api/gallery` with JSON response and static file serving.

### Task 3: Frontend Integration

**Files:**
- Create: `src/features/gallery/galleryApi.js`
- Modify: `src/features/gallery/index.js`

- [ ] Add API loader with fallback behavior.
- [ ] Render static gallery immediately, then replace with API data when available.
- [ ] Emit gallery load events for future features.

### Task 4: Project Scripts

**Files:**
- Create: `package.json`
- Create: `.env.example`
- Modify: `scripts/dev-server.mjs`
- Modify: `scripts/check-static.mjs`

- [ ] Add scripts for dev, test, static check, and database init.
- [ ] Route the existing dev server through the new API server.
- [ ] Add static checks for the new server and gallery API files.

### Task 5: Verification

- [ ] Run `npm install mysql2`.
- [ ] Run `npm test`.
- [ ] Run `node scripts/check-static.mjs`.
- [ ] Start the dev server and verify `/`, `/src/main.js`, and `/api/gallery`.
