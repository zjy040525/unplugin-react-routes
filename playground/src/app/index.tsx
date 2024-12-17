import { Link, Outlet } from 'react-router-dom'

const str = Date.now().toString()

export const Component = () => {
  return (
    <>
      <h1>
        <Link to={`/${str}`}>/{str}</Link>
      </h1>
      <Outlet />
    </>
  )
}
