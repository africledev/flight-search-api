import type { components, operations } from "./oas-generated.js";

export type GameType = components["schemas"]["GameType"];

export type APIError = components["schemas"]["APIError"];

export type TriviaPathParams =
	operations["getTriviaForNumber"]["parameters"]["path"];

type TriviaResponse =
	operations["getTriviaForNumber"]["responses"]["200"]["content"]["application/json"];
export type TriviaOutput = Omit<TriviaResponse, "type"> & {
	type: "trivia";
};

export type MathPathParams =
	operations["getMathFactForNumber"]["parameters"]["path"];

type MathResponse =
	operations["getMathFactForNumber"]["responses"]["200"]["content"]["application/json"];

export type MathFactOutput = Omit<MathResponse, "type"> & {
	type: "math";
};

export type DatePathParams =
	operations["getDateFactForPeriod"]["parameters"]["path"];

type DateResponse =
	operations["getDateFactForPeriod"]["responses"]["200"]["content"]["application/json"];

export type DateFactOutput = Omit<DateResponse, "type"> & {
	type: "date";
};
