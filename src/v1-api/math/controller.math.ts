import type { MathAPIHandler } from "../types/types.js";
import * as errors from "./errors.math.js";
import * as service from "./service.math.js";

export const mathFactController: MathAPIHandler = async (
	request,
	response,
): Promise<void> => {
	const num = Number.parseInt(request.params.num, 10);
	try {
		const mathFact = await service.getMathFactFor(num);
		response.status(200).json(mathFact);
	} catch (error) {
		const err = error as Error;
		const status = 500;
		let msg = err.message;
		if (!(err instanceof errors.MathFactError)) {
			msg = `Unable to retrieve math fact for ${num}. Pls try again later`;
		}

		response.status(status).json({ error: msg });
	}
};
