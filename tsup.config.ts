import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/*.ts'],
  dts: true,
  clean: true,
  format: ['cjs', 'esm'],
  cjsInterop: true,
  splitting: true,
})
