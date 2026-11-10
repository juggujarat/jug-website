// Builds the original single-page Community Day for Java 2025 site so it keeps
// working at /community-day-for-java-2025 while the rest of the site moves to Astro.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const here = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: here,
  base: '/community-day-for-java-2025/',
  publicDir: path.resolve(here, '../public'),
  plugins: [react()],
  build: {
    outDir: path.resolve(here, '../.legacy-dist/community-day-for-java-2025'),
    emptyOutDir: true,
    copyPublicDir: false,
  },
})
