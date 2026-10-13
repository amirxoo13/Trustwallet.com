import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t } from "./i18n-CodmchUZ.mjs";
import { t as WalletShell } from "./wallet-shell-8PIYcTGh.mjs";
import { t as MarketsScreen } from "./markets-Uu0vcso2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/markets-CD-PzVrJ.js
var import_jsx_runtime = require_jsx_runtime();
function WalletMarketsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletShell, {
		title: t().wallet.markets,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketsScreen, { embedded: true })
	});
}
//#endregion
export { WalletMarketsPage as component };
