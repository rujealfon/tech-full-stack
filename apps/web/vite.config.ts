import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "../api/public",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@/web": path.resolve(__dirname, "./src"),
      "@tech-full-stack/api-client": path.resolve(
        __dirname,
        "../../packages/api-client/src/index.ts",
      ),
    },
  },
  plugins: [
    tsconfigPaths(),
    vue(),
  ],
  server: {
    proxy: {
      "/api": "http://localhost:8787",
    },
  },
});
