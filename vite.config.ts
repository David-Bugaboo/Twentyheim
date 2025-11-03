import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.{jsx,tsx}",
      exclude: /node_modules/,
    }),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        // Habilita SW no dev apenas em desenvolvimento; produção usa build/preview
        enabled: process.env.NODE_ENV === "development",
      },
      includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Twentyheim",
        short_name: "Twentyheim",
        description: "Warband Builder PWA",
        theme_color: "#0ea5e9",
        background_color: "#0b0b0b",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "/pwa-512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,woff2}"],
      },
    }),
  ],
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.webp"],
  build: {
    assetsInlineLimit: 0, // Evita inline de imagens grandes
  },
  server: {
    host: true,
    allowedHosts: [
      // Cloudflare Tunnel host
      "stopping-creatures-rentals-pmc.trycloudflare.com",
    ],
  },
});
