import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use repo name as base for GitHub Pages
export default defineConfig({
  base: '/spendor/',
  plugins: [react()],
})