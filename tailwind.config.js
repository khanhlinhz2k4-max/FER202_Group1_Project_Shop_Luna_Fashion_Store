/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    // Disable preflight to preserve existing custom Vanilla CSS without any breaking resets
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border, 38 27% 85%))",
        input: "hsl(var(--input, 38 27% 85%))",
        ring: "hsl(var(--ring, 29 31% 36%))",
        background: "hsl(var(--background, 38 43% 97%))",
        foreground: "hsl(var(--foreground, 28 32% 13%))",
        primary: {
          DEFAULT: "var(--primary-brown, #775B3F)",
          foreground: "var(--light-cream, #FEE3AF)",
        },
        secondary: {
          DEFAULT: "var(--light-cream, #FEE3AF)",
          foreground: "var(--primary-brown, #775B3F)",
        },
        accent: {
          DEFAULT: "var(--caramel, #CAA072)",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "var(--bg-subtle, #F5EFEB)",
          foreground: "var(--text-muted, #8F7965)",
        },
        card: {
          DEFAULT: "var(--bg-surface, #FFFFFF)",
          foreground: "var(--text-primary, #2C2117)",
        },
      },
      borderRadius: {
        lg: "var(--radius, 8px)",
        md: "calc(var(--radius, 8px) - 2px)",
        sm: "calc(var(--radius, 8px) - 4px)",
      },
    },
  },
  plugins: [],
}
