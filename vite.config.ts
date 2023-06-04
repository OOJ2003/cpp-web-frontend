import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from "vite-plugin-singlefile"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile()],

  server: {
    proxy: {
      "/api": {
        target: "http://0.0.0.0:18080",
        changeOrigin: true,
      },
    },
  },
})
