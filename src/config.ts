import Dotenv from "dotenv";
import { z } from "zod";

Dotenv.config();

const EnvSchema = z.object({
	AppName: z.string(),
	PORT: z.coerce.number(),
	NumbersAPIUrl: z.string().url(),
	MaxExternalAPIRetries: z.coerce.number().min(1).max(10),
});

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof EnvSchema> {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			[key: string]: string | number | boolean;
		}
	}
}

export const config = EnvSchema.parse(process.env);
