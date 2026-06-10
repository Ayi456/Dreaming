# Frontend Architecture

This project uses a dependency-free feature architecture. It uses native ES Modules, so run it through the local static server for the most reliable browser behavior.

## Layers

```text
index.html
  Static page shell and mount points only.

styles/
  tokens.css       Design tokens
  base.css         Reset and document defaults
  layout.css       Page sections and grids
  components.css   Shared buttons, chips, cards
  responsive.css   Breakpoints and reduced motion fallbacks

src/core/
  app.js                 Creates app context
  eventBus.js            Cross-feature events
  featureRegistry.js     Mounts and destroys features
  store.js               Shared state
  dom.js                 Small DOM helpers

src/data/
  profile.js       Replaceable content data

src/features/
  Each feature owns its JavaScript and optional CSS.

scripts/
  dev-server.mjs   Local static server for ES Modules
  check-static.mjs Architecture and source smoke check
```

## Feature Contract

Every feature exports a factory:

```js
export function createExampleFeature(context) {
  return {
    id: "example",
    mount(root) {},
    destroy() {}
  };
}
```

Features receive the shared context:

```js
{
  root,
  data,
  eventBus,
  store,
  reduceMotion
}
```

## Communication

Features should communicate through `eventBus`, not by importing each other.

Examples:

```js
eventBus.emit("gallery:opened", item);
eventBus.on("seed:planted", () => react());
```

This keeps gallery, pet, garden, and future mini-games independent.

## Adding A Feature

1. Create `src/features/<feature-name>/index.js`.
2. Add feature-specific CSS beside it when needed.
3. Add a mount point to `index.html` only if the feature needs one.
4. Import and register the feature in `src/main.js`.
5. Use `eventBus` for cross-feature reactions.
6. Add content to `src/data/profile.js` if the feature is data-driven.

## Running Locally

```bash
node scripts/dev-server.mjs
```

Then open the URL printed by the server.

## Current Features

- `garden`: canvas garden background and seed planting
- `projectSeeds`: expandable project cards
- `gallery`: visual gallery with dialog preview
- `abilities`: skill greenhouse rendering
- `pet`: draggable top-layer mascot using transparent frames derived from `static/girl2.png`
- `contact`: email copy feedback
- `navigation`: nav event tracking
- `reveal`: scroll reveal animation
