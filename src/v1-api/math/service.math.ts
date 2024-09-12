import { backOff as retryAndBackOff } from "exponential-backoff";
import { config } from "../../config.js";
import { NumbersIQ } from "../numbersiq/index.js";
import type { MathFactOutput } from "../types/oas.js";
import * as errors from "./errors.math.js";

const MaxExternalAPIRetries = config.MaxExternalAPIRetries;

export const getMathFactFor = async (num: number): Promise<MathFactOutput> => {
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

	const mathFactResult = await retryAndBackOff(
		() => NumbersIQ.get().mathFactFor(num),
		backOffAndRetryOpts,
	);

	if (apiAttempts > MaxExternalAPIRetries) {
		console.warn(`API call attempt ${apiAttempts} failed. Will retry`);
		throw new errors.MathFactError(
			`Could not retrieve math fact for ${num}. The API is not reachable. Pls try again`,
		);
	}

	if (!mathFactResult) {
		throw new errors.MathFactError(
			`Could not retrieve math fact for ${num}. Pls try again`,
		);
	}

	return mathFactResult;
};
