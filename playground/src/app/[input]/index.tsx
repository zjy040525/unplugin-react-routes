import { type FC, useEffect, useState } from 'react'
import { Link, Outlet, useParams, useRouteError } from 'react-router'

export const Component: FC = () => {
  const params = useParams()
  const [count, setCount] = useState(0)
  const error = () => {
    setCount(count + 1)
  }
  useEffect(() => {
    if (count > 0) {
      throw new Error(`count: ${count}`)
    }
  }, [count])
  return (
    <>
      <h3>Nested Routes</h3>
      <p>{params.input}</p>
      <p>
        <button onClick={error}>Error</button>
      </p>
      <Outlet />
    </>
  )
}

export const ErrorBoundary: FC = () => {
  const error = useRouteError() as Error
  return (
    <>
      <h3>{error.name}</h3>
      <pre>{error.message}</pre>
      <pre>{error.stack}</pre>
      <p>
        <Link to="/">Back</Link>
      </p>
    </>
  )
}
