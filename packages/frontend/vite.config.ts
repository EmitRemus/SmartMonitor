import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  if (!env.VITE_PORT || Number.isNaN(parseInt(env.VITE_PORT))) {
    throw new Error(
      "❌ VITE_PORT is not defined (or is invalid) in your .env file"
    );
  }

  return {
    server: {
      port: parseInt(env.VITE_PORT), // fallback to default if not set
    },
    plugins: [react(), tailwindcss()],
  };
});
