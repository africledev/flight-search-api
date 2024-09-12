export class TriviaError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "TriviaError";
	}
}
