import fs from "node:fs";
import SwaggerParser from "@apidevtools/swagger-parser";
import yaml from "js-yaml";

SwaggerParser.dereference("src/v1-api/api.yaml", (err, deRefedApi) => {
	if (err) {
		console.error(err);
		return;
	}

	const deRefedApiStr = yaml.dump(deRefedApi, {
		noRefs: true,
		noCompatMode: true,
	});
	fs.writeFile("./docs/api-derefed.yaml", deRefedApiStr, (err) => {
		if (err) {
			console.warn(err);
		}
	});
});
