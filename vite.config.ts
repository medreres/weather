/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

const getCache = ({ name, pattern }: any) => {
  console.log(pattern);
  return {
    urlPattern: pattern,
    handler: "NetworkFirst" as const,
    options: {
      cacheName: name,
      expiration: {
        maxEntries: 500,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 years
      },
      cacheableResponse: {
        statuses: [200],
      },
    },
  };
};

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Weather App",
        short_name: "Weather",
        description: "Weather prediction for the following week",
        theme_color: "#212529",
        icons: [
          {
            src: "favicon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          getCache({
            pattern: /.*api.open-meteo.*/gm,
            name: "forecast",
          }),
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
  },
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components/"),
      // …
    },
  },
});
