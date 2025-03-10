import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()
  ],
  // base: "/",
  // build: {
  //   outDir: 'dist'
  // },
  // server: {
  //   // port: 5177 ,
  //   host: "0.0.0.0",
  //   strictPort: true,
  //   cors: true,
  // },
})
