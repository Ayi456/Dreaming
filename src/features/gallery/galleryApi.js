export function normalizeGalleryItem(item, index = 0) {
  const visual = item.visual || "visual-a";

  return {
    id: item.id || item.slug || `gallery-${index + 1}`,
    slug: item.slug || item.id || `gallery-${index + 1}`,
    title: item.title || "Untitled",
    type: item.type || "Gallery",
    description: item.description || "",
    visual: /^[A-Za-z0-9_-]+$/.test(visual) ? visual : "visual-a",
    imageUrl: item.imageUrl || item.image_url || null,
    sortOrder: item.sortOrder ?? item.sort_order ?? index
  };
}

export async function loadGalleryItems({
  endpoint = "/api/gallery",
  fetchImpl = globalThis.fetch,
  fallbackItems = []
} = {}) {
  try {
    const response = await fetchImpl(endpoint, {
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Gallery API returned ${response.status}`);
    }

    const payload = await response.json();
    const items = Array.isArray(payload) ? payload : payload.items;
    if (!Array.isArray(items)) {
      throw new Error("Gallery API response must include an items array");
    }

    return items.map(normalizeGalleryItem);
  } catch (error) {
    return fallbackItems;
  }
}
