import { defineConfig } from 'vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react'
import path from "path";
import tailwindcss from "@tailwindcss/vite"
import tsConfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  base: "/admin/",
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    // Add vite plugins below this line:
    tsConfigPaths(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
