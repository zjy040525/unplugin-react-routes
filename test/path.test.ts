import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { createDirectory } from '../src/core/directory'
import { createBrowserPath, createImportPath } from '../src/core/path'

describe.concurrent('path resolve', () => {
  it('import', () => {
    const directory = createDirectory('playground/src/app', 'index.tsx')
    const importPath = createImportPath(directory)

    expect(importPath).toEqual<typeof importPath>([
      {
        importPath: path.join(process.cwd(), 'playground/src/app/index.tsx'),
        source: 'playground/src/app/index.tsx',
        metadata: void 0,
      },
      {
        importPath: path.join(
          process.cwd(),
          'playground/src/app/[input]/index.tsx',
        ),
        source: 'playground/src/app/[input]/index.tsx',
        metadata: void 0,
      },
    ])
    expect(createImportPath([])).toEqual([])
  })
  it('browser', () => {
    const directory = createDirectory('playground/src/app', 'index.tsx')
    const browserPath = createBrowserPath(
      directory,
      'playground/src/app',
      'index.tsx',
    )

    expect(browserPath).toEqual<typeof browserPath>([
      {
        browserPath: '/',
        metadata: void 0,
        source: 'playground/src/app/index.tsx',
      },
      {
        browserPath: '/:input',
        metadata: void 0,
        source: 'playground/src/app/[input]/index.tsx',
      },
    ])
    expect(createBrowserPath([], 'playground/src/app', 'index.tsx')).toEqual([])
  })
  it('mixin', () => {
    const directory = createDirectory('playground/src/app', 'index.tsx')

    const importPath = createImportPath(directory)
    const browserPath = createBrowserPath(
      directory,
      'playground/src/app',
      'index.tsx',
    )

    type Mixin = typeof importPath & typeof browserPath
    const mixinOut: Mixin = [
      {
        browserPath: '/',
        importPath: path.join(process.cwd(), 'playground/src/app/index.tsx'),
        metadata: void 0,
        source: 'playground/src/app/index.tsx',
      },
      {
        browserPath: '/:input',
        importPath: path.join(
          process.cwd(),
          'playground/src/app/[input]/index.tsx',
        ),
        metadata: void 0,
        source: 'playground/src/app/[input]/index.tsx',
      },
    ]

    expect(
      createBrowserPath(importPath, 'playground/src/app', 'index.tsx'),
    ).toEqual<Mixin>(mixinOut)
    expect(createImportPath(browserPath)).toEqual<Mixin>(mixinOut)
  })
})
