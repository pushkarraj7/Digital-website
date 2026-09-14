import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    process.env.ANALYZE &&
      visualizer({ open: true, gzipSize: true, brotliSize: true }),
  ].filter(Boolean),
  build: {
    minify: "esbuild",
    target: "esnext",
    esbuild: {
      drop: ["console", "debugger"],
    },
    modulePreload: {
      resolveDependencies: (filename, deps) =>
        deps.filter((dep) => !dep.includes("three-vendor")),
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "three-vendor": ["three", "@react-three/fiber", "@react-three/drei"],
          "react-vendor": ["react", "react-dom"],
          "framer-vendor": ["framer-motion"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
