/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Essential for GitHub Pages relative paths
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true, // simplified usage
  },
})
