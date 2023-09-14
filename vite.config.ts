import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dynamicImport from 'vite-plugin-dynamic-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [
        'babel-plugin-macros'
      ]
    },
  }),
  dynamicImport()],
  server: {
    proxy: { 
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
        // secure: false,
        // ws: true
      }
    }
  },
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'build'
  }
});
