export class DateFactError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "DateFactError";
	}
}
