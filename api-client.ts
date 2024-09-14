
import { FactsApi } from "./sdk/index.ts";

(async () => {
	const fact = await FactsApi.getDateFactForPeriod({
        params: {
            when: "01-20"
        }
    });
	console.log(fact);
})();




