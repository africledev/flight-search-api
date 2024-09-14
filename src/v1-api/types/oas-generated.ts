/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export type paths = {
    "/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get metadata from the API root */
        get: operations["getMetadata"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/trivia/{num}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a trivia fact for a number */
        get: operations["getTriviaForNumber"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/{num}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: paths["/trivia/{num}"]["get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/math/{num}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a Math fact for a number */
        get: operations["getMathFactForNumber"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/date/{when}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a date fact for a period in time */
        get: operations["getDateFactForPeriod"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
};
export type webhooks = Record<string, never>;
export type components = {
    schemas: {
        /**
         * Format: int32
         * @example 42
         */
        NumQuery: string;
        DateQuery: string;
        /** @enum {string} */
        GameType: "math" | "date" | "trivia";
        APIError: {
            /** @example Bad Request */
            error: string;
        };
        TriviaResponse: {
            /** @example The number 42 is the answer to the question Life */
            text: string;
            /** @example 42 */
            number: number;
            /** @example true */
            found: boolean;
            /** @example trivia */
            type: components["schemas"]["GameType"];
        };
        MathResponse: {
            /** @example 5 is the number of platonic solids */
            text: string;
            /** @example 5 */
            number: number;
            /** @example true */
            found: boolean;
            /** @example math */
            type: components["schemas"]["GameType"];
        };
        DateResponse: {
            /** @example September 10th is the day in 2001 that Charles Ingram cheats his way into winning one million pounds on a British version of Who Wants to be a Millionaire. */
            text: string;
            /** @example 2001 */
            year: number;
            /** @example 254 */
            number: number;
            /** @example true */
            found: boolean;
            /** @example date */
            type: components["schemas"]["GameType"];
        };
        MetaResponse: {
            /** @example NumberAma is up and running! */
            message: string;
        };
    };
    responses: {
        /** @description Bad Request */
        BadRequest: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["APIError"];
            };
        };
        /** @description Internal Server Error */
        InternalServerError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["APIError"];
            };
        };
    };
    parameters: {
        /**
         * @description The number to search for
         * @example 42
         */
        NumParam: components["schemas"]["NumQuery"];
        /** @description The month-day combination or year to search for. Valid usage includes:
         *     - 01-20 (January 20th)
         *     - 12-31 (December 31st)
         *     - 2001 (Year 2001)
         *     - 1999 (Year 1999)
         *
         *     Some invalid usage includes:
         *     - 01-2001 (January 2001st)
         *     13-01 (invalid month)
         *     01-32 (invalid day)
         *     2100 (year out of range)
         *     999 (incomplete year)
         *
         *     For optimal results, ensure using a valid month-day or year value as the
         *     in-built validation might still not catch all invalid dates like 02-31 (a.k.a Feb, 31st).
         *      */
        DateParam: components["schemas"]["DateQuery"];
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export interface operations {
    getMetadata: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getTriviaForNumber: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description The number to search for
                 * @example 42
                 */
                num: components["parameters"]["NumParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TriviaResponse"];
                };
            };
            400: components["responses"]["BadRequest"];
            500: components["responses"]["InternalServerError"];
        };
    };
    getMathFactForNumber: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description The number to search for
                 * @example 42
                 */
                num: components["parameters"]["NumParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MathResponse"];
                };
            };
            400: components["responses"]["BadRequest"];
            500: components["responses"]["InternalServerError"];
        };
    };
    getDateFactForPeriod: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The month-day combination or year to search for. Valid usage includes:
                 *     - 01-20 (January 20th)
                 *     - 12-31 (December 31st)
                 *     - 2001 (Year 2001)
                 *     - 1999 (Year 1999)
                 *
                 *     Some invalid usage includes:
                 *     - 01-2001 (January 2001st)
                 *     13-01 (invalid month)
                 *     01-32 (invalid day)
                 *     2100 (year out of range)
                 *     999 (incomplete year)
                 *
                 *     For optimal results, ensure using a valid month-day or year value as the
                 *     in-built validation might still not catch all invalid dates like 02-31 (a.k.a Feb, 31st).
                 *      */
                when: components["parameters"]["DateParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DateResponse"];
                };
            };
            400: components["responses"]["BadRequest"];
            500: components["responses"]["InternalServerError"];
        };
    };
}
