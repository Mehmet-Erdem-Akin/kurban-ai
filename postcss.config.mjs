import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Tek kaynak: `tailwind.config.ts` (darkMode: class + tema). `.js` yoksa yanlışlıkla seçilmesin. */
const config = {
  plugins: {
    tailwindcss: {
      config: path.join(__dirname, "tailwind.config.ts"),
    },
    autoprefixer: {},
  },
};

export default config;
