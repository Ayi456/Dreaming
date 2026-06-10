import test from "node:test";
import assert from "node:assert/strict";
import { mapGalleryRow } from "../../src/server/galleryRepository.mjs";

test("maps a MySQL gallery row to a frontend gallery item", () => {
  const item = mapGalleryRow({
    id: 12,
    slug: "soft-garden",
    title: "Soft Garden",
    type: "界面实验",
    description: "淡绿色互动网页实验。",
    visual: "visual-a",
    image_url: "/static/demo.png",
    sort_order: 3
  });

  assert.deepEqual(item, {
    id: "soft-garden",
    slug: "soft-garden",
    title: "Soft Garden",
    type: "界面实验",
    description: "淡绿色互动网页实验。",
    visual: "visual-a",
    imageUrl: "/static/demo.png",
    sortOrder: 3
  });
});
