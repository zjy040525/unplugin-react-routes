import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
  createBrowserRouter,
  type RouteObject,
} from 'react-router-dom'
import { routes } from 'virtual:react-routes'
import { Loading } from './Loading.tsx'
import { Splat } from './Splat.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider
      router={createBrowserRouter([
        ...(routes as RouteObject[]),
        {
          path: '*',
          element: <Splat />,
        },
      ])}
      fallbackElement={<Loading />}
    />
  </StrictMode>,
)
