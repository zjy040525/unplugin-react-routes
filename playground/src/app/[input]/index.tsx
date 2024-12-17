import { type FC, useEffect, useState } from 'react'
import { Link, useParams, useRouteError } from 'react-router'

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
      <h2>
        <Link to="/">Input: {params.input}</Link>
      </h2>
      <div>
        <button onClick={error}>Error</button>
      </div>
    </>
  )
}

export const ErrorBoundary: FC = () => {
  const error = useRouteError() as Error
  return (
    <>
      <h3>{error.name}</h3>
      <p>
        <pre>{error.message}</pre>
      </p>
      <p>
        <pre>{error.stack}</pre>
      </p>
      <p>
        <Link to="/">Back</Link>
      </p>
    </>
  )
}
