import { createEventBus } from "./eventBus.js";
import { createFeatureRegistry } from "./featureRegistry.js";
import { createStore } from "./store.js";
import { profile } from "../data/profile.js";

export function createApp({ root = document, features = [] } = {}) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const eventBus = createEventBus();
  const store = createStore({
    seeds: profile.stats.seeds,
    growth: profile.stats.growth,
    petMood: "curious",
    activeGalleryItem: null
  });

  const context = {
    root,
    data: profile,
    eventBus,
    store,
    reduceMotion
  };

  const registry = createFeatureRegistry(context);

  return {
    mount() {
      registry.mount(features);
      eventBus.emit("app:mounted", { featureCount: features.length });
    },

    destroy() {
      registry.destroy();
      eventBus.emit("app:destroyed");
    },

    context,
    registry
  };
}
