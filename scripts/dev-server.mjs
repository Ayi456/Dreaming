import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { startServer } from "../src/server/server.mjs";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));

startServer({ root });
