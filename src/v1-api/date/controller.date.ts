import type { DateAPIHandler } from "../types/types.js";
import * as errors from "./errors.date.js";
import * as service from "./service.date.js";

export const dateFactController: DateAPIHandler = async (
	request,
	response,
): Promise<void> => {
	const { when } = request.params;
	try {
		const dateFact = await service.getDateFactFor(when);
		response.status(200).json(dateFact);
	} catch (error) {
		const err = error as Error;
		const status = 500;
		let msg = err.message;
		if (!(err instanceof errors.DateFactError)) {
			msg = `Unable to retrieve date fact for ${when}. Pls try again later`;
		}

		response.status(status).json({ error: msg });
	}
};
