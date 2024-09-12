import type { components, operations } from "./oas-generated.js";

export type GameType = components["schemas"]["GameType"];

export type APIErrorResponse = components["schemas"]["ErrorResponse"];

export type TriviaPathParams =
	operations["getTriviaForNumber"]["parameters"]["path"];

type TriviaResponse =
	operations["getTriviaForNumber"]["responses"]["200"]["content"]["application/json"];
export type TriviaOutput = Omit<TriviaResponse, "type"> & {
	type: "trivia";
};
