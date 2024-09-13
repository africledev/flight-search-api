import { backOff as retryAndBackOff } from "exponential-backoff";
import { config } from "../../config.js";
import { NumbersIQ } from "../../external/numbersiq/index.js";
import type { DateFactOutput } from "../types/oas.js";
import * as errors from "./errors.date.js";

const MaxExternalAPIRetries = config.MaxExternalAPIRetries;

export const getDateFactFor = async (when: string): Promise<DateFactOutput> => {
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

	let whenStr = when;
	if (/^\d{1,2}-\d{1,2}$/.test(when)) {
		whenStr = when.replace("-", "/");
	}

	const dateFactResult = await retryAndBackOff(
		() => NumbersIQ.get().dateFactFor(whenStr),
		backOffAndRetryOpts,
	);

	if (apiAttempts > MaxExternalAPIRetries) {
		console.warn(`API call attempt ${apiAttempts} failed. Will retry`);
		throw new errors.DateFactError(
			`Could not retrieve date fact for ${when}. The API is not reachable. Pls try again`,
		);
	}

	if (!dateFactResult) {
		throw new errors.DateFactError(
			`Could not retrieve date fact for ${when}. Pls try again`,
		);
	}

	return dateFactResult;
};
