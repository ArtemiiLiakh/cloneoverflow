import path from 'path';
import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: 'esbuild',
    assetsDir: 'assets',
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.html'),
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  plugins: [react()],
  esbuild: {
    target: 'es2024'
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})