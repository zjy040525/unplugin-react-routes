# unplugin-react-routes

[![NPM version](https://img.shields.io/npm/v/unplugin-react-routes?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-react-routes)

File-based routing, similar to Next.js App Router. Powered by [unplugin](https://github.com/unjs/unplugin).

## Install

```bash
npm i -D unplugin-react-routes
# or
yarn add -D unplugin-react-routes
# or
pnpm add -D unplugin-react-routes
# or
bun add -D unplugin-react-routes
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import reactRoutes from 'unplugin-react-routes/vite'

export default defineConfig({
  plugins: [
    reactRoutes({
      /* options */
    }),
  ],
})
```

<br></details>

## Setup

Add TypeScript type support.

```ts
// vite-env.d.ts
/// <reference types="vite/client" />
/// <reference types="unplugin-react-routes/client" />
```

If you don't have a .d.ts file, you can add this code to `tsconfig.json`.

```json lines
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["unplugin-react-routes/client"]
  }
}
```

Changes to the entry file

```diff
// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
-import App from './App.tsx'
+import { createBrowserRouter } from 'react-router'
+import { RouterProvider } from 'react-router/dom'
+import { routes } from 'virtual:react-routes'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
-   <App />
+   <RouterProvider router={createBrowserRouter(routes)} />
  </StrictMode>,
)
```

Create `app` folder under `src`, move `App.tsx` under app and rename it to `index.tsx`, taking care to adjust relative paths.

To get the page to display in a browser, you also need to export the `Component`.

The following optional exports are available.

### ErrorBoundary

[react-router](https://reactrouter.com/start/framework/route-module#errorboundary)

### metadata (experimental)

```ts
import { type Metadata } from 'unplugin-react-routes/types'

export const metadata: Metadata = {
  // Nested routing.
  // If true, it will end up in a tree structure with the directory structure.
  // If false, it will be at the same level as the parent route.
  // Default: true
  nested: true,
}
```

## Configuration

The following is the default values of the plugin

```ts
reactRoutes({
  // relative paths to the directory to search for pages.
  dir: 'src/app',
  // specify the file name as the routing page file.
  index: 'index.tsx',
})
```
