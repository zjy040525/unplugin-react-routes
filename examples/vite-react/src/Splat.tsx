import { type FC } from 'react'
import { useParams } from 'react-router'

export interface SplatProps {}

export const Splat: FC<SplatProps> = () => {
  const { '*': splat = '' } = useParams()
  return (
    <>
      <h1>Splats</h1>
      <p>{splat}</p>
    </>
  )
}
