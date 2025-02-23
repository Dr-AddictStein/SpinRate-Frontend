import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, // Optional: specify port
    open: true, // Optional: open browser on start
    historyApiFallback: {
      disableDotRule: true
    }
  },
  preview: {
    port: 5173, // Optional: specify port for preview
    historyApiFallback: {
      disableDotRule: true
    }
  }
})