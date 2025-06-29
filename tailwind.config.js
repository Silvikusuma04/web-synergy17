import { Config } from "tailwindcss";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-sea-blue': '#0A2F5B',
        'forest-green': '#004D40',
        'sky-blue': '#87CEEB',
        'sand-beige': '#F4E9D8',
        'warm-coral': '#FF7F50',
      },
      fontFamily: {
        'serif': ['Lora', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;