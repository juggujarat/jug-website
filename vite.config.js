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

  server: {
    allowedHosts: [
      '56cd-2409-40e3-3088-98db-e012-e7f8-1404-83e8.ngrok-free.app'
    ]
  }
})
