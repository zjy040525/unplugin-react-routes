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

Create an `app` folder under `src`, move `App.tsx` to app and rename it to `index.tsx`, taking care to adjust the relative path of the import statement.

Change export statement.

```tsx
// index.tsx

// export default App

export const Component = () => {
  /* Code for the `App` component. */
}
```

Start the development server, if it is already started, restart it.

You should now see what `index.tsx` presents in your browser.

You can also export these components:

```tsx
// https://reactrouter.com/start/framework/route-module#errorboundary
export const ErrorBoundary = () => {
  /* code */
}
```

## Routing

The following routes have been implemented

### Index Routes

Index routes render into their parent's <Outlet/> at their parent's URL (like a default child route).

[react-router](https://reactrouter.com/start/library/routing#index-routes)

Usage: `/src/app/_index/index.tsx`

```tsx
import { RouteObject } from 'react-router'

// The generated structure looks like this
export default [
  {
    path: '/',
    children: [
      {
        index: true,
      },
    ],
  },
] satisfies RouteObject[]
```

### Nested Routes

Nesting based on directory paths.

Usage: `/src/app/a/b/c/index.tsx`

```tsx
import { RouteObject } from 'react-router'

// The generated structure looks like this
export default [
  {
    path: '/',
    children: [
      {
        path: 'a',
        children: [
          {
            path: 'b',
            children: [
              {
                path: 'c',
              },
            ],
          },
        ],
      },
    ],
  },
] satisfies RouteObject[]
```

### Dynamic Segments/Routes

Using a pair of `[]` wrappers, the internal name will be used as the name of the property fetched in `useParams`.

Usage: `/src/app/[postId]/index.tsx`

```tsx
import { RouteObject } from 'react-router'

// The generated structure looks like this
export default [
  {
    path: '/',
    children: [
      {
        path: ':postId',
      },
    ],
  },
] satisfies RouteObject[]
```

## Configuration

The following is the default values of the plugin.

```ts
reactRoutes({
  // relative paths to the directory to search for pages.
  dir: 'src/app',
  // specify the file name as the routing page file.
  index: 'index.tsx',
})
```
