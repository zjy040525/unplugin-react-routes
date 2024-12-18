import { expect, test } from 'vitest'
import { createDirectory } from '../src/core/directory'

test('simulate scanning of files in playground', () => {
  const directory = createDirectory('playground/src/app', 'index.tsx')
  expect(directory).toEqual<typeof directory>([
    { source: 'playground/src/app/index.tsx', metadata: void 0 },
    { source: 'playground/src/app/[input]/index.tsx', metadata: void 0 },
    { source: 'playground/src/app/_index/index.tsx', metadata: void 0 },
    { source: 'playground/src/app/[input]/_index/index.tsx', metadata: void 0 },
  ])
  expect(createDirectory('invalid_path', 'index.tsx')).toEqual([])
})
