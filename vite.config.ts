import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

const getCache = ({ name, pattern }: any) => ({
  urlPattern: pattern,
  handler: "CacheFirst" as const,
  options: {
    cacheName: name,
    expiration: {
      maxEntries: 500,
      maxAgeSeconds: 60 * 60 * 24 * 365 * 2, // 2 years
    },
    cacheableResponse: {
      statuses: [200],
    },
  },
});

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Weather App",
        short_name: "Weather",
        description: "Weather prediction for the following week",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icon.png",
            sizes: "16x16",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          getCache({
            pattern:
              "https://api.open-meteo.com/v1/forecast?latitude=49.84&longitude=24.02&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe%2FMoscow",
            name: "forecast",
          }),
          getCache({
            pattern: "https://www.gstatic.com/charts/loader.js",
            name: "charts",
          }),
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  server: {
    host: true,
  },
});
