
# Polkadot 3D Ecosystem Explorer

An interactive 3D visualization of the Polkadot ecosystem built with React, Vite, and `@react-three/fiber`. Explore the Relay Chain (Layer 0), parachains (Layer 1), and dApps (Layer 2) with guided tours, layer toggles, and detailed info panels.

## Features
- 3D scene with orbit controls and glow effects for Relay Chain, Parachains, and dApps
- Layer toggles (L0/L1/L2) to focus the view
- Guided tour that steps through the architecture
- Info panel with beginner/advanced modes and technical details
- Smooth animations, stars background, fog, and sparkles for a polished look

## Tech Stack
- React + TypeScript
- Vite
- `@react-three/fiber`, `@react-three/drei`, `three`
- Tailwind (via CDN in `index.html`)
- Icons: `lucide-react`

## Getting Started

### Prerequisites
- Node.js 18+ (20 recommended) and npm
- A modern browser with WebGL enabled

### Installation
```bash
npm install
npm run dev
```
Then open the printed local URL (defaults to http://localhost:3000).

### Environment Variables
The app currently defines `process.env.GEMINI_API_KEY` in `vite.config.ts`. If you need it, create a `.env.local` in the project root:
```
GEMINI_API_KEY=your-key
```
If you do not use this key, you can leave it unset.

### Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview the production build locally

### Project Structure (high level)
- `index.html` – document shell and Tailwind CDN include
- `index.tsx` – React entrypoint
- `App.tsx` – app state, layout, and UI wiring
- `components/PolkadotWorld.tsx` – 3D scene and rendering
- `components/OverlayUI.tsx` – UI overlay, tour, toggles, info panel
- `constants.ts` / `types.ts` – shared data and typings

### Deployment
This is a static Vite app. Typical options:
- **Vercel/Netlify/Cloudflare Pages**: run `npm run build` and deploy the `dist/` folder.
- **Static hosting (S3, GCS, nginx, etc.)**: upload the `dist/` contents and ensure SPA routing (serve `index.html` for unknown routes, if applicable).

## Contributing (open source)
- Issues and PRs are welcome. Please describe the change, include screenshots for UI updates, and note any new dependencies.
- Code style: TypeScript + React hooks; keep components small; prefer descriptive prop names.
- 3D scene tips: avoid heavy geometry; prefer `useMemo` for derived data; use `dpr={[1,2]}` to balance quality/performance.
- Add tests or lightweight checks when practical (e.g., lint/typecheck if added).

## License
A license file is not yet included. Choose and add one (e.g., MIT, Apache-2.0) to clarify reuse for the open-source release.

## Troubleshooting
- Black screen or nothing renders: ensure `index.html` includes `<script type="module" src="/index.tsx"></script>` (already fixed) and that the browser supports WebGL.
- Missing dependencies: rerun `npm install`.
- Slow rendering: lower device pixel ratio in `PolkadotWorld` (dpr) or reduce star/particle counts.
