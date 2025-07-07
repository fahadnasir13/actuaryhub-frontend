import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // ✅ IMPORTANT: Set base to root
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
