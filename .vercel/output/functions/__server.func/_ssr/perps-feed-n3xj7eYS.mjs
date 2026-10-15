import { t as createServerFn } from "./ssr.mjs";
import { n as createSsrRpc } from "./addresses-BTbj67Cj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/perps-feed-n3xj7eYS.js
var loadPerpMarkets = createServerFn({ method: "GET" }).handler(createSsrRpc("11ec7de365bdde6f12d22455d07d0d753573eda0ecb113d397b0b368b4a6e3a7"));
var loadPerpMids = createServerFn({ method: "GET" }).handler(createSsrRpc("89f56e9d5bd7a0a623c2945f0f7c9bdfbf92d6a8f76109971d9056f82e1f90f8"));
//#endregion
export { loadPerpMids as n, loadPerpMarkets as t };
