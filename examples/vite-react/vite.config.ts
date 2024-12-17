import react from '@vitejs/plugin-react-swc'
import reactRoutes from 'unplugin-react-routes/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    reactRoutes({
      index: 'page.tsx',
    }),
  ],
})
