import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    host: "0.0.0.0",
    strictPort: true,
    cors: true,
  },
  build: {
    outDir: "dist"
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  },
  define: {
    "process.env": {},
  },
  preview: {
    port: 4173,
    host: true
  }
})
