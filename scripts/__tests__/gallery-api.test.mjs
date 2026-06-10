import test from "node:test";
import assert from "node:assert/strict";
import { loadGalleryItems } from "../../src/features/gallery/galleryApi.js";

test("loads gallery items from the API when the response is valid", async () => {
  const items = await loadGalleryItems({
    fallbackItems: [],
    fetchImpl: async (url) => {
      assert.equal(url, "/api/gallery");
      return {
        ok: true,
        async json() {
          return {
            items: [
              {
                slug: "from-db",
                title: "From DB",
                type: "数据库",
                description: "来自数据库。",
                visual: "visual-b"
              }
            ]
          };
        }
      };
    }
  });

  assert.equal(items.length, 1);
  assert.equal(items[0].id, "from-db");
  assert.equal(items[0].title, "From DB");
});

test("falls back to static gallery items when the API fails", async () => {
  const fallbackItems = [{ id: "fallback", title: "Fallback" }];
  const items = await loadGalleryItems({
    fallbackItems,
    fetchImpl: async () => {
      throw new Error("network down");
    }
  });

  assert.deepEqual(items, fallbackItems);
});
