import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub Pages project path: https://<user>.github.io/mebs-emo-site/
export default defineConfig({
  plugins: [react()],
  base: '/mebs-emo-site/',
})
