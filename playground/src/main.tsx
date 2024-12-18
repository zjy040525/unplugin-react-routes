import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { routes } from 'virtual:react-routes'
import { Loading } from './Loading.tsx'
import { Splat } from './Splat.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider
      router={createBrowserRouter([
        ...routes.map((route) => {
          if (route.path === '/') {
            return {
              ...route,
              hydrateFallbackElement: <Loading />,
            }
          }
          return route
        }),
        {
          path: '*',
          element: <Splat />,
        },
      ])}
    />
  </StrictMode>,
)
