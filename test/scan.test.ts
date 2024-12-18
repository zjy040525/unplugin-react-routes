import { expect, test } from 'vitest'
import { createDirectory } from '../src/core/directory'

test('simulate scanning of files in playground', () => {
  const directory = createDirectory('playground/src/app', 'index.tsx')
  expect(directory).toStrictEqual<typeof directory>([
    { source: 'playground/src/app/index.tsx' },
    { source: 'playground/src/app/[input]/index.tsx' },
    { source: 'playground/src/app/_index/index.tsx' },
    { source: 'playground/src/app/[input]/_index/index.tsx' },
  ])
  expect(createDirectory('invalid_path', 'index.tsx')).toStrictEqual([])
})
