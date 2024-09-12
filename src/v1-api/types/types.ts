import type {
	ParamsDictionary,
	RequestHandler,
} from "express-serve-static-core";

import type * as oas from "./oas.js";

type APIHandlerConfig = {
	pathParams?: ParamsDictionary;
	queryParams?: Record<string, unknown>;
	requestBody?: Record<string, unknown>;
	responseBody?: Record<string, unknown>;
};

type BackendAPIHandler<T extends APIHandlerConfig> = RequestHandler<
	T["pathParams"] extends ParamsDictionary ? T["pathParams"] : ParamsDictionary,
	T["responseBody"],
	T["requestBody"],
	T["queryParams"]
>;

export type TriviaAPIHandler = BackendAPIHandler<{
	pathParams: oas.TriviaPathParams;
	responseBody: oas.TriviaOutput | oas.APIErrorResponse;
}>;

export interface INumbersIQ {
	triviaFor(num: number): Promise<oas.TriviaOutput | undefined>;
}
