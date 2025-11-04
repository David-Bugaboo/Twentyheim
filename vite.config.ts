import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.{jsx,tsx}",
      exclude: /node_modules/,
    }),
  ],
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.webp"],
  optimizeDeps: {
    include: [
      "@emotion/react",
      "@emotion/styled",
      "@emotion/use-insertion-effect-with-fallbacks",
      "@mui/material",
      "@mui/icons-material",
    ],
  },
  resolve: {
    dedupe: ["@emotion/react", "@emotion/styled"],
  },
  build: {
    assetsInlineLimit: 0, // Evita inline de imagens grandes
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    host: true,
    allowedHosts: [
      // Cloudflare Tunnel host
      "stopping-creatures-rentals-pmc.trycloudflare.com",
    ],
  },
});
