import * as errors from "./errors.trivia.js";
import * as service from "./service.trivia.js";
import type { TriviaAPIHandler } from "../types/types.js";

export const triviaController: TriviaAPIHandler = async (
	request,
	response,
): Promise<void> => {
	const num = Number.parseInt(request.params.num, 10);
	try {
		const triviaResult = await service.getTriviaFor(num);
		response.status(200).json(triviaResult);
	} catch (error) {
		const err = error as Error;
		const status = 500;
		let msg = err.message;
		if (!(err instanceof errors.TriviaError)) {
			msg = `Unable to retrieve trivia for ${num}. Pls try again later`;
		}

		response.status(status).json({ error: msg });
	}
};
