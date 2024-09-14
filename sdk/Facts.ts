import { Zodios, type ZodiosOptions, makeApi } from "@zodios/core";
import { z } from "zod";

type TriviaResponse = {
	/**
	 * @example "The number 42 is the answer to the question Life"
	 */
	text: string;
	/**
	 * @example 42
	 */
	number: number;
	/**
	 * @example true
	 */
	found: boolean;
	type: GameType;
};
type GameType =
	/**
	 * @enum math, date, trivia
	 */
	"math" | "date" | "trivia";
type MathResponse = {
	/**
	 * @example "5 is the number of platonic solids"
	 */
	text: string;
	/**
	 * @example 5
	 */
	number: number;
	/**
	 * @example true
	 */
	found: boolean;
	type: GameType;
};
type DateResponse = {
	/**
	 * @example "September 10th is the day in 2001 that Charles Ingram cheats his way into winning one million pounds on a British version of Who Wants to be a Millionaire."
	 */
	text: string;
	/**
	 * @example 2001
	 * @pattern [0-9]{4}
	 */
	year: number;
	/**
	 * @example 254
	 */
	number: number;
	/**
	 * @example true
	 */
	found: boolean;
	type: GameType;
};

const GameType = z.enum(["math", "date", "trivia"]);
const TriviaResponse: z.ZodType<TriviaResponse> = z
	.object({
		text: z.string(),
		number: z.number().int(),
		found: z.boolean(),
		type: GameType,
	})
	.strict()
	.passthrough();
const MathResponse: z.ZodType<MathResponse> = z
	.object({
		text: z.string(),
		number: z.number().int(),
		found: z.boolean(),
		type: GameType,
	})
	.strict()
	.passthrough();
const DateResponse: z.ZodType<DateResponse> = z
	.object({
		text: z.string(),
		year: z.number().int(),
		number: z.number().int(),
		found: z.boolean(),
		type: GameType,
	})
	.strict()
	.passthrough();

export const schemas = {
	GameType,
	TriviaResponse,
	MathResponse,
	DateResponse,
};

const endpoints = makeApi([
	{
		method: "get",
		path: "/trivia/:num",
		alias: "getTriviaForNumber",
		requestFormat: "json",
		parameters: [
			{
				name: "num",
				type: "Path",
				schema: z.string().describe("The number to search for"),
			},
		],
		response: TriviaResponse,
		errors: [
			{
				status: 400,
				description: "Bad Request",
				schema: z.object({ error: z.string() }).strict().passthrough(),
			},
			{
				status: 500,
				description: "Internal Server Error",
				schema: z.object({ error: z.string() }).strict().passthrough(),
			},
		],
	},
	{
		method: "get",
		path: "/:num",
		alias: "getNum",
		requestFormat: "json",
		response: z.void(),
	},
	{
		method: "get",
		path: "/math/:num",
		alias: "getMathFactForNumber",
		requestFormat: "json",
		parameters: [
			{
				name: "num",
				type: "Path",
				schema: z.string().describe("The number to search for"),
			},
		],
		response: MathResponse,
		errors: [
			{
				status: 400,
				description: "Bad Request",
				schema: z.object({ error: z.string() }).strict().passthrough(),
			},
			{
				status: 500,
				description: "Internal Server Error",
				schema: z.object({ error: z.string() }).strict().passthrough(),
			},
		],
	},
	{
		method: "get",
		path: "/date/:when",
		alias: "getDateFactForPeriod",
		requestFormat: "json",
		parameters: [
			{
				name: "when",
				type: "Path",
				schema: z
					.string()
					.regex(
						/^(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])|(?:19|20)\d{2})$/,
					)
					.describe(`The month-day combination or year to search for. Valid usage includes:
- 01-20 (January 20th)
- 12-31 (December 31st)
- 2001 (Year 2001)
- 1999 (Year 1999)

Some invalid usage includes:  
- 01-2001 (January 2001st)
13-01 (invalid month)
01-32 (invalid day)
2100 (year out of range)
999 (incomplete year)

For optimal results, ensure using a valid month-day or year value as the 
in-built validation might still not catch all invalid dates like 02-31 (a.k.a Feb, 31st).`),
			},
		],
		response: DateResponse,
		errors: [
			{
				status: 400,
				description: "Bad Request",
				schema: z.object({ error: z.string() }).strict().passthrough(),
			},
			{
				status: 500,
				description: "Internal Server Error",
				schema: z.object({ error: z.string() }).strict().passthrough(),
			},
		],
	},
]);

export const FactsApi = new Zodios("http://localhost:8888/api", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
