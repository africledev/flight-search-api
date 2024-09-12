import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as OpenApiValidator from "express-openapi-validator";
import jsyaml from "js-yaml";

import type { Request } from "express";

const __filename = fileURLToPath(import.meta.url);
const apiSpecYaml = (basePath: string) => {
	const ymlFilePath = path.resolve(
		path.dirname(__filename),
		basePath,
		"api-derefed.yaml",
	);
	const ymlAsString = fs.readFileSync(ymlFilePath, "utf8");
	return jsyaml.load(ymlAsString) as string;
};

export const apiAutoValidator = (basePath = "../") =>
	OpenApiValidator.middleware({
		apiSpec: apiSpecYaml(basePath),
		validateRequests: {
			allowUnknownQueryParameters: false,
		},
		validateResponses: {
			onError(error: { message?: string }, _json: unknown, request: Request) {
				const { method, originalUrl } = request;
				console.warn(
					`${method.toUpperCase()} ${originalUrl} failed response validation - ${error.message}`,
				);
			},
		},

		ignorePaths: /docs/,
	});
