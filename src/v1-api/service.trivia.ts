import { backOff as retryAndBackOff } from "exponential-backoff";
import { config } from "../config.js";
import * as errors from "./errors.trivia.js";
import { NumbersIQ } from "./numbersiq/index.js";
import type { TriviaOutput } from "./types/oas.js";

const MaxExternalAPIRetries = config.MaxExternalAPIRetries;

export const getTriviaFor = async (num: number): Promise<TriviaOutput> => {
	let apiAttempts = 0;

	const backOffAndRetryOpts = {
		numOfAttempts: MaxExternalAPIRetries,
		retry: (_e: unknown, attemptCount: number) => {
			apiAttempts = attemptCount;
			let msg = `Calling Numbers API failed [${attemptCount}]. Will`;
			msg +=
				attemptCount >= MaxExternalAPIRetries ? " no longer retry" : " retry";
			console.warn(msg);
			return true;
		},
	};

	const triviaResult = await retryAndBackOff(
		() => NumbersIQ.get().triviaFor(num),
		backOffAndRetryOpts,
	);

	if (apiAttempts > MaxExternalAPIRetries) {
		console.warn(`API call attempt ${apiAttempts} failed. Will retry`);
		throw new errors.TriviaError(
			`Could not retrieve trivia for ${num}. The API is not reachable. Pls try again`,
		);
	}

	if (!triviaResult) {
		throw new errors.TriviaError(
			`Could not retrieve trivia for ${num}. Pls try again`,
		);
	}

	return triviaResult;
};
