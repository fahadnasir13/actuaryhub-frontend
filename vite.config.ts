import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // ✅ must be '/' for Vercel
  build: {
    outDir: 'dist', // ✅ optional but explicit
  },
})
