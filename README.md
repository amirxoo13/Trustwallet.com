# Trust — Crypto Wallet (student project)

Self-custody wallet UI inspired by Trust Wallet. Live prices from public APIs. **On the published Grok / Vercel app, admin edits (text, images, profile, balances, login timer) are stored in a shared database so every browser sees the same data.** GitHub Pages builds stay local-only.

## Accounts

| Role | Email | Password |
| --- | --- | --- |
| **Admin** (control panel) | `amir.behi2333@gmail.com` | `Amir6229` |
| **Client** (wallet only) | `akbarmousavi1356@gmail.com` | `Hr39/Vopq9` |

Only the admin can open the control panel.

### Client login

- A **3-minute timer** starts when the login page is opened. After 00:00 the client cannot sign in.
- Admin can restart the timer from the panel (**T20 / F20 / K20** tab). The new window applies on every browser.
- Client must tap **T20**, **F20** or **K20** the **first** time they unlock. Later logins hide those buttons; Send still uses the first choice.
- After login, tapping **Send** opens a notice popup for that code. Edit the popup text in the admin panel.

## Control panel (admin only)

After admin login: sliders icon, **Settings → Control panel**, or `/studio`.

- Site name, logo, every sentence, photos
- Client profile (name, address, phone, national ID, license photo)
- Client balances
- T20 / F20 / K20 send-popup titles and body text
- Reset the 3-minute login timer

After you publish, open the panel once in the browser that already has your edits so they copy to the shared database. Other phones and browsers then load that copy.

## Wallet

Send (address check + network fee + confirm), Receive (QR + copy), Swap (live rate), Buy (card demo), activity, charts.

## PWA (install as an app)

- **Android / Chrome:** browser menu → **Install app** / **Add to Home Screen**. Also in Wallet → Settings.
- **iPhone:** Share → **Add to Home Screen**.

## GitHub Pages

1. Push this repo to GitHub.
2. Settings → Pages → Source: **GitHub Actions**.
3. Site: `https://<username>.github.io/<repo>/`

Pages has no database. Use the Grok publish / Vercel deploy for shared data across browsers.

## Free APIs (no key)

- CoinGecko prices + charts
- Binance fallback tickers + klines

Demo only — no real on-chain sends.
