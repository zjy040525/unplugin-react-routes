import React from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import ReactRouter from '../src/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [React(), Inspect(), ReactRouter({})],
})
