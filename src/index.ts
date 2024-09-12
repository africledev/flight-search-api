import path from "node:path";
import { fileURLToPath } from "node:url";

import cors from "cors";
import express from "express";
import morgan from "morgan";
import { config } from "./config.js";
import { apiAutoValidator } from "./mw.js";
import router from "./v1-api/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/", router);

const __filename = fileURLToPath(import.meta.url);
const apiDocsRoot = path.join(path.dirname(__filename), "../", "docs");
app.use("/docs", express.static(apiDocsRoot));
app.use(apiAutoValidator("../docs/"));

const PORT = config.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
