import { Link, Outlet } from 'react-router'

export const Component = () => {
  return (
    <>
      <h2>App</h2>
      <p>
        <Link to="/nested-routes">Nested Route</Link>
      </p>
      <Outlet />
    </>
  )
}
