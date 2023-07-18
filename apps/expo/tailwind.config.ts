import type { Config } from "tailwindcss";

import baseConfig from "@kdx/tailwind-config";

export default {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  presets: [baseConfig],
} satisfies Config;
