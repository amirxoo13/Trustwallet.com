import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as marketMap, i as fetchMarkets, n as fetchChart } from "./prices-BvAkPWEU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-markets-TxqhgRCg.js
function useMarkets() {
	return useQuery({
		queryKey: ["markets"],
		queryFn: fetchMarkets,
		staleTime: 3e4,
		refetchInterval: 6e4,
		retry: 2
	});
}
function useMarketMap() {
	const q = useMarkets();
	return q.data ? marketMap(q.data) : {};
}
function useChart(id, days) {
	return useQuery({
		queryKey: [
			"chart",
			id,
			days
		],
		queryFn: () => fetchChart(id, days),
		enabled: Boolean(id),
		staleTime: 6e4,
		retry: 1
	});
}
//#endregion
export { useMarketMap as n, useMarkets as r, useChart as t };
