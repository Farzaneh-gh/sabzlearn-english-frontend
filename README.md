

---

**Summary: Using SVG Sprite in React with Vite and Tailwind**

1. **Install the library:**

```
npm install vite-plugin-svg-icons --save-dev
```

This plugin combines your SVG files into one SVG sprite.

---

2. **Configure `vite.config.js`:**

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")], // folder with SVG files
      symbolId: "icon-[name]", // defines the symbol id pattern
    }),
  ],
});
```

---

3. **Put your SVG icon files** (e.g., `shopping-cart.svg`) inside:

```
src/assets/icons
```

---

4. **Register the sprite in your app** (usually in `main.jsx` or `App.jsx`):

```js
import "virtual:svg-icons-register";
```

This injects the SVG sprite into the DOM.

---

5. **Use the icons in your React components:**

```jsx
<svg className="w-6 h-6">
  <use href="#icon-shopping-cart" />
</svg>
```

Make sure the `href` matches the `symbolId` pattern (`icon-[name]`).

---

**Tips:**

* Restart the dev server after adding new icons.
* Use Tailwind classes to size or style the SVG.
* Check that `import "virtual:svg-icons-register";` is present and path in `vite.config.js` is correct if icons don’t show.

