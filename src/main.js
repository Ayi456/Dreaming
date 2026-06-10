import { createApp } from "./core/app.js";
import { createAbilitiesFeature } from "./features/abilities/index.js";
import { createContactFeature } from "./features/contact/index.js";
import { createGalleryFeature } from "./features/gallery/index.js";
import { createGardenFeature } from "./features/garden/index.js";
import { createNavigationFeature } from "./features/navigation/index.js";
import { createPetFeature } from "./features/pet/index.js";
import { createProjectSeedsFeature } from "./features/projectSeeds/index.js";
import { createRevealFeature } from "./features/reveal/index.js";

const app = createApp({
  root: document,
  features: [
    createNavigationFeature,
    createGardenFeature,
    createProjectSeedsFeature,
    createGalleryFeature,
    createAbilitiesFeature,
    createContactFeature,
    createPetFeature,
    createRevealFeature
  ]
});

app.mount();
window.gardenApp = app;
