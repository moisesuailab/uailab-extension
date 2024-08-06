import type { Config } from "tailwindcss"

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}',"./static/*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
