import { Zodios, type ZodiosOptions, makeApi } from "@zodios/core";
import { z } from "zod";

const endpoints = makeApi([
	{
		method: "get",
		path: "/",
		alias: "getMetadata",
		requestFormat: "json",
		response: z
			.object({ message: z.string().max(250) })
			.strict()
			.passthrough(),
	},
]);

export const MetaApi = new Zodios("http://localhost:8888/api", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
