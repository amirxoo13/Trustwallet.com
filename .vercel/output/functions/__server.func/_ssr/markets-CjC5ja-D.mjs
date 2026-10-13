import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t } from "./i18n-BCR4HeH-.mjs";
import { t as WalletShell } from "./wallet-shell-VK6j_mAb.mjs";
import { t as MarketsScreen } from "./markets-mb3oXhdb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/markets-CjC5ja-D.js
var import_jsx_runtime = require_jsx_runtime();
function WalletMarketsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletShell, {
		title: t().wallet.markets,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketsScreen, { embedded: true })
	});
}
//#endregion
export { WalletMarketsPage as component };
