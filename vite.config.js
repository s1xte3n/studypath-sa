import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // GitHub Pages uses /studypath-sa/; deployments at a domain root can override this.
  base: process.env.VITE_BASE_PATH || "/studypath-sa/",
  plugins: [react()],
  server: {
    host: "127.0.0.1"
  },
  preview: {
    host: "127.0.0.1"
  }
});
