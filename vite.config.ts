import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
//
// This is the GitHub Pages *user* site (paimonchan.github.io), served at the
// bare domain root, so `base` is '/'. Asset paths resolve correctly without
// any subpath prefix.
export default defineConfig({
  base: '/',
  plugins: [tailwindcss(), react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler'))
            return 'vendor-react'
          if (id.includes('node_modules/lucide-react')) return 'vendor-icons'
        },
      },
    },
  },
})
