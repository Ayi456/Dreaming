export function createFeatureRegistry(context) {
  const mountedFeatures = new Map();

  return {
    mount(featureFactories) {
      featureFactories.forEach((createFeature) => {
        const feature = createFeature(context);
        if (!feature?.id || typeof feature.mount !== "function") {
          throw new Error("Feature must expose id and mount()");
        }

        feature.mount(context.root);
        mountedFeatures.set(feature.id, feature);
      });
    },

    destroy() {
      Array.from(mountedFeatures.values()).reverse().forEach((feature) => {
        feature.destroy?.();
      });
      mountedFeatures.clear();
    },

    get(id) {
      return mountedFeatures.get(id);
    }
  };
}
