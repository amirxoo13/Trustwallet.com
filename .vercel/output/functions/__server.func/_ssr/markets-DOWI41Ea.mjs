import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as WalletShell } from "./wallet-shell-DUOd2QiC.mjs";
import { t as SwapMarkets } from "./swap-markets-OGRgt0_l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/markets-DOWI41Ea.js
var import_jsx_runtime = require_jsx_runtime();
function WalletMarketsPage() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletShell, {
		home: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwapMarkets, { onSwap: () => void navigate({ to: "/wallet/swap" }) })
	});
}
//#endregion
export { WalletMarketsPage as component };
