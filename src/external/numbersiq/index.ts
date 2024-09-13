import { config } from "../../config.js";
import axios from "./axios.js";

import type * as oas from "../../v1-api/types/oas.js";
import type { INumbersIQ } from "../../v1-api/types/types.js";

export class NumbersIQ implements INumbersIQ {
	private baseUrl: string;
	private static instance: NumbersIQ | undefined = undefined;

	private constructor() {
		this.baseUrl = config.NumbersAPIUrl;
	}

	public static get() {
		if (!NumbersIQ.instance) {
			NumbersIQ.instance = new NumbersIQ();
		}
		return NumbersIQ.instance;
	}

	async triviaFor(num: number): Promise<oas.TriviaOutput | undefined> {
		const url = `${this.baseUrl}/${num}/trivia?default=${this.boringTxt(num)}`;
		let output: oas.TriviaOutput | undefined = undefined;

		try {
			const { data } = await axios.get<oas.TriviaOutput>(url);
			output = data;
			return output;
		} catch (error) {
			console.error(error);
		}

		return output;
	}

	async mathFactFor(num: number): Promise<oas.MathFactOutput | undefined> {
		const url = `${this.baseUrl}/${num}/math?default=${this.boringTxt(num)}`;
		let output: oas.MathFactOutput | undefined = undefined;

		try {
			const { data } = await axios.get<oas.MathFactOutput>(url);
			output = data;
			return output;
		} catch (error) {
			console.error(error);
		}

		return output;
	}

	async dateFactFor(when: string): Promise<oas.DateFactOutput | undefined> {
		const url = `${this.baseUrl}/${when}/date?default=${this.boringTxt(when)}`;
		let output: oas.DateFactOutput | undefined = undefined;

		try {
			const { data } = await axios.get<oas.DateFactOutput>(url);
			output = data;
			return output;
		} catch (error) {
			console.error(error);
		}

		return output;
	}

	boringTxt(value: number | string): string {
		if (typeof value === "number") {
			return `${value} is boring! try a different number.`;
		}

		return `${value} is boring! try a different date.`;
	}
}
