import path from "node:path";
import { fileURLToPath } from "node:url";

import cors from "cors";
import express from "express";
import morgan from "morgan";
import { config } from "./config.js";
import { apiAutoValidator } from "./mw.js";
import { terminateGracefully } from "./utils/index.js";
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
const appName = config.AppName || "NumberAma";
const server = app
	.listen(PORT, () => {
		console.log(`[${appName} Server] is running on port ${PORT}`);
	})
	.on("error", (err) => {
		console.warn(`[${appName} Server] Error starting server on port ${PORT}`);
		console.error(err);
		process.exit(1);
	});

process.on("SIGINT", terminateGracefully(server, "SIGINT"));
process.on("SIGHUP", terminateGracefully(server, "SIGHUP"));
process.on("SIGTERM", terminateGracefully(server, "SIGTERM"));
