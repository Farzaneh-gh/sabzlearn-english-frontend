---

**Summary: Using SVG Sprite in React with Vite and Tailwind**

<!--
  README for sabzlearn-english-frontend
  Generated: provide clear setup, dev & build instructions, and notes for contributors.
-->

# SabzLearn - English (Frontend)

A responsive React frontend for the SabzLearn English learning platform. Built with Vite, React, Tailwind CSS and several handy UI/utility libraries (DaisyUI, Swiper, Plyr, SweetAlert, etc.). This repository contains the client-side application used to browse courses, manage user accounts, and watch course content.

## Quick status

- Framework: React 19 + Vite
- Styling: Tailwind CSS (and DaisyUI)
- Icon sprite: vite-plugin-svg-icons (SVG sprite registered at runtime)
- Forms & validation: react-hook-form

## Features

- Responsive layout with Tailwind CSS
- User panel with courses, tickets, and account editing
- SVG sprite support using `vite-plugin-svg-icons`
- Media player (Plyr) and carousel (Swiper)

## Requirements

- Node.js 18+ (recommended)
- npm or yarn

## Getting started

1. Clone the repo:

```bash
git clone https://github.com/<your-username>/sabzlearn-english-frontend.git
cd sabzlearn-english-frontend
```

2. Install dependencies:

```bash
# with npm
npm install

# or with yarn
# yarn
```

3. Environment variables

This project expects some environment variables for backend URLs and image hosting. Create a `.env` file in the project root with the variables you need. Example:

```env
# URL used to fetch images (used in components as import.meta.env.VITE_BACKEND_URL_IMG)
VITE_BACKEND_URL_IMG=http://localhost:4000

# API base (if used by api modules)
VITE_API_BASE_URL=http://localhost:4000/api
```

Restart the dev server after creating or updating `.env`.

4. Start development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown by Vite).

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - build production assets
- `npm run preview` - preview the built app
- `npm run lint` - run ESLint

## SVG icons (sprite) setup

This project uses `vite-plugin-svg-icons` to combine `src/assets/icons` into a single SVG sprite. If you add new SVGs, follow these steps:

1. Put your SVG files in `src/assets/icons`.
2. Ensure `vite.config.js` contains the `createSvgIconsPlugin` configuration (it should already).
3. Register the sprite in your application entry (usually `main.jsx`):

```js
import "virtual:svg-icons-register";
```

4. Use icons like this in components:

```jsx
<svg className="w-6 h-6">
  <use href="#icon-your-icon-file-name" />
</svg>
```

If icons are not showing, restart the dev server.

## Environment & API notes

- Many components expect `VITE_BACKEND_URL_IMG` or `VITE_API_BASE_URL` to be set. Check `src/api/*` for usage.
- If you run into CORS or auth issues, confirm the backend is reachable and CORS is configured on the backend server.

## Contributing

Contributions are welcome. Please open issues for bugs or feature requests and send PRs for fixes.

Suggested workflow:

1. Fork the repo
2. Create a feature branch
3. Run and test locally
4. Create a pull request with a clear description

## Troubleshooting

- If dev server fails to start, check Node version and that dependencies installed correctly.
- If images or API calls return 404, verify the `VITE_BACKEND_URL_IMG` and `VITE_API_BASE_URL` env variables.
- If SVG icons don't appear, confirm `import "virtual:svg-icons-register";` exists in the entry file and restart Vite.

## License




