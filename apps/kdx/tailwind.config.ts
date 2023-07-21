import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@kdx/tailwind-config";
import uiConfig from "@kdx/ui/tailwind.config";

export default {
  presets: [baseConfig, uiConfig],
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/components/**/*.{ts,tsx}",
  ],
} satisfies Config;
