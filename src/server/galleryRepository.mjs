export function mapGalleryRow(row) {
  return {
    id: row.slug || String(row.id),
    slug: row.slug,
    title: row.title,
    type: row.type,
    description: row.description,
    visual: row.visual,
    imageUrl: row.image_url || null,
    sortOrder: row.sort_order ?? 0
  };
}

export async function listGalleryItems(pool) {
  const [rows] = await pool.execute(`
    SELECT id, slug, title, type, description, visual, image_url, sort_order
    FROM gallery_items
    WHERE is_published = 1
    ORDER BY sort_order ASC, id ASC
  `);

  return rows.map(mapGalleryRow);
}
