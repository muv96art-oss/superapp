import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Wider Safari support for the public Vercel link
    target: ['es2020', 'safari14'],
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
  },
})
