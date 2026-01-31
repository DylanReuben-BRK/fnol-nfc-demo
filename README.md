# FNOL NFC POC

This is a front-end-only proof of concept for a mobile-first First Notification of Loss (FNOL) workflow, triggered by NFC, for motor vehicle insurance claims. The project is designed for demo purposes and is hosted on GitHub Pages.

## Features
- **No backend, no database** — all data is in JavaScript memory
- **Token resolver** — reads a token from the URL and loads the correct policy/vehicle context
- **Hard-coded token map** — demo tokens mapped to sample policy and vehicle data
- **FNOL workflow** — simple, step-by-step claim process:
  1. Show policy and vehicle details
  2. Collect incident type, date, description, and drivable status
  3. Show a confirmation screen
  4. Show a success screen with a fake claim reference
- **Mobile-first UI** — large buttons, single-column layout, minimal text, works well on iOS and Android browsers
- **No persistence** — all data is lost on refresh

## Usage
1. **Clone or download this repository.**
2. **Open `index.html` in your browser.**
3. **Pass a token in the URL** to load a demo policy/vehicle context:
   - Query string: `index.html?token=abc123`
   - Hash: `index.html#token=abc123`
   - (Replace `abc123` with any valid token from the hard-coded map in `app.js`)

## File Structure
- `index.html` — Main HTML entry point
- `styles.css` — Mobile-first styles
- `app.js` — All app logic, token resolver, workflow, and in-memory data
- `README.md` — This file

## Demo Tokens
Example tokens (see `app.js` for more):
- `abc123`
- `xyz789`

## Screenshots
> Add screenshots here if desired

## Disclaimer
This is a demo-only project. No real claims are submitted. There is no authentication, security, or data persistence. For demonstration purposes only.

---

© 2026 Brolink (Pty) Ltd. All rights reserved.
