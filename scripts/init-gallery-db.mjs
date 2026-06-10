import { profile } from "../src/data/profile.js";
import { createDatabaseConfig, loadEnvFile } from "../src/server/config.mjs";
import { createMysqlConnection } from "../src/server/db.mjs";

function escapeIdentifier(identifier) {
  if (!/^[A-Za-z0-9_]+$/.test(identifier)) {
    throw new Error(`Unsafe database identifier: ${identifier}`);
  }
  return "`" + identifier + "`";
}

loadEnvFile();
const config = createDatabaseConfig();
const databaseName = config.database;
const databaseIdentifier = escapeIdentifier(databaseName);

const adminConfig = { ...config };
delete adminConfig.database;

const adminConnection = await createMysqlConnection(adminConfig);
await adminConnection.query(
  `CREATE DATABASE IF NOT EXISTS ${databaseIdentifier} DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
);
await adminConnection.end();

const connection = await createMysqlConnection(config);
await connection.query(`
  CREATE TABLE IF NOT EXISTS gallery_items (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(80) NOT NULL UNIQUE,
    title VARCHAR(160) NOT NULL,
    type VARCHAR(80) NOT NULL,
    description TEXT NOT NULL,
    visual VARCHAR(80) NOT NULL DEFAULT 'visual-a',
    image_url VARCHAR(500) NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_published TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
`);

for (const [index, item] of profile.gallery.entries()) {
  await connection.execute(
    `
      INSERT INTO gallery_items
        (slug, title, type, description, visual, image_url, sort_order, is_published)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        type = VALUES(type),
        description = VALUES(description),
        visual = VALUES(visual),
        image_url = VALUES(image_url),
        sort_order = VALUES(sort_order),
        is_published = VALUES(is_published)
    `,
    [
      item.id,
      item.title,
      item.type,
      item.description,
      item.visual || "visual-a",
      item.imageUrl || null,
      index + 1
    ]
  );
}

await connection.end();
console.log(`Gallery database initialized: ${databaseName}.gallery_items`);
