export class MathFactError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "MathFactError";
	}
}
