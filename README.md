# starter-app-fixtures

Clean, purpose-built starter apps used as agent-evaluation fixtures. Each app is
realistic but minimal, has a clear set of user actions worth tracking, and ships
**with no product analytics wired in** — the user-action handlers just `console.log`
today. Adding/instrumenting analytics is the task an agent is dropped in to do.

| Fixture | Stack | Archetype | Trackable actions |
|---|---|---|---|
| [`vanilla-admin`](./vanilla-admin) | plain HTML/CSS/JS | admin panel | sign in · create product · delete product · sign out |
| [`vanilla-shop`](./vanilla-shop) | plain HTML/CSS/JS | storefront | open cart · add to cart · checkout |
| [`vanilla-blog`](./vanilla-blog) | plain HTML/CSS/JS | content / blog | open post · subscribe · contact |
| [`next-minimal`](./next-minimal) | Next.js 15 (App Router, TS) | project workspace (SaaS) | sign up · log in · create task · complete task · invite · upgrade |
| [`vite-react-minimal`](./vite-react-minimal) | Vite + React (TS) | spending tracker (SPA) | add expense · filter · raise budget |
| [`rn-feed-app`](./rn-feed-app) | Expo / React Native (TS) | authenticated feed | log in · open post · like · log out |

## Running

- **Vanilla sites** need no build step — open `index.html` in a browser (or serve the folder).
- **Next.js app** — `cd next-minimal && npm install && npm run dev` (or `npm run build`).
- **Vite React app** — `cd vite-react-minimal && npm install && npm run dev` (or `npm run build`).
- **Expo app** — `cd rn-feed-app && npm install && npx expo start`.

All fixtures are MIT-licensed and free of any analytics SDK. The framework apps
are intentionally light (tens of dependencies, sub-10s installs) so an agent can
clone, install, and instrument them quickly.
