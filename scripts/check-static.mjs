import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "index.html",
  "styles/tokens.css",
  "styles/base.css",
  "styles/layout.css",
  "styles/components.css",
  "styles/responsive.css",
  "src/main.js",
  "src/core/app.js",
  "src/core/eventBus.js",
  "src/core/featureRegistry.js",
  "src/core/store.js",
  "src/data/profile.js",
  "src/server/config.mjs",
  "src/server/db.mjs",
  "src/server/galleryRepository.mjs",
  "src/server/server.mjs",
  "src/server/staticFiles.mjs",
  "src/features/garden/index.js",
  "src/features/gallery/index.js",
  "src/features/gallery/galleryApi.js",
  "src/features/pet/index.js",
  "src/features/projectSeeds/index.js",
  "src/features/contact/index.js",
  "src/features/abilities/index.js",
  "scripts/dev-server.mjs",
  "scripts/init-gallery-db.mjs",
  "package.json",
  ".env.example",
  "static/girl.png",
  "static/girl2.png",
  "static/mascot-idle.png",
  "static/mascot-wave.png",
  "static/mascot-happy.png",
  "static/mascot-idle-cutout.png",
  "static/mascot-wave-cutout.png",
  "static/mascot-happy-cutout.png",
  "static/mascot2-idle-cutout.png",
  "static/mascot2-wave-cutout.png",
  "static/mascot2-happy-cutout.png",
  "docs/architecture.md"
];

const files = requiredFiles.map((file) => [file, existsSync(file)]);
const sourceFiles = [
  "index.html",
  "styles/tokens.css",
  "styles/base.css",
  "styles/layout.css",
  "styles/components.css",
  "styles/responsive.css",
  "src/features/garden/garden.css",
  "src/features/gallery/gallery.css",
  "src/features/pet/pet.css",
  "src/main.js",
  "src/core/app.js",
  "src/core/eventBus.js",
  "src/core/featureRegistry.js",
  "src/core/store.js",
  "src/core/dom.js",
  "src/server/config.mjs",
  "src/server/galleryRepository.mjs",
  "src/features/gallery/galleryApi.js",
  "src/features/garden/index.js",
  "src/features/gallery/index.js",
  "src/features/pet/index.js",
  "src/features/projectSeeds/index.js",
  "src/features/contact/index.js",
  "src/features/abilities/index.js",
  "src/features/reveal/index.js",
  "src/features/navigation/index.js"
];

const combined = sourceFiles.map((file) => readFileSync(file, "utf8")).join("\n");
const html = readFileSync("index.html", "utf8");
const main = readFileSync("src/main.js", "utf8");
const profileText = readFileSync("src/data/profile.js", "utf8");

const checks = [
  ...files.map(([file, ok]) => ["file exists: " + file, ok]),
  ["module script", html.includes('type="module" src="./src/main.js"')],
  ["garden mount", html.includes("gardenCanvas") && html.includes("plantSeedButton")],
  ["project mount", html.includes("data-project-seeds")],
  ["gallery mount", html.includes("data-gallery")],
  ["pet mount", html.includes("data-pet-root")],
  ["contact mount", html.includes("data-copy-email")],
  ["abilities mount", html.includes("data-abilities")],
  ["gallery registered", main.includes("createGalleryFeature")],
  ["gallery api loader", combined.includes("loadGalleryItems") && combined.includes("/api/gallery")],
  ["mysql config defaults", combined.includes("DB_PASSWORD") && combined.includes("123456")],
  ["pet registered", main.includes("createPetFeature")],
  ["projects data", ["morning-board", "idea-catcher", "brand-microsite", "ai-workflow"].every((id) => profileText.includes(id))],
  ["gallery data", ["sprout-ui", "flow-map", "mini-brand", "agent-desk"].every((id) => profileText.includes(id))],
  ["abilities data", ["产品判断", "前端工程", "视觉表达", "工作流设计"].every((name) => profileText.includes(name))],
  ["mascot frames", ["mascot2-idle-cutout.png", "mascot2-wave-cutout.png", "mascot2-happy-cutout.png"].every((name) => profileText.includes(name))],
  ["pet top layer", combined.includes("z-index: 2147483000")],
  ["reduced motion", combined.includes("prefers-reduced-motion")],
  ["light theme", combined.includes("color-scheme: light") && !combined.includes("color-scheme: dark")],
  ["no em dash", !/\u2014/.test(combined)],
  ["no letter spacing", !/letter-spacing/i.test(combined)],
  ["no scroll listener", !/addEventListener\("scroll/.test(combined)],
  ["no h-screen", !/h-screen/.test(combined)]
];

const failed = checks.filter(([, ok]) => !ok);

if (failed.length > 0) {
  console.error("failed:", failed.map(([name]) => name).join(", "));
  process.exit(1);
}

console.log("static smoke passed:", checks.length, "checks");
