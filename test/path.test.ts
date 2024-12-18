import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { createDirectory } from '../src/core/directory'
import { createBrowserPath, createImportPath } from '../src/core/path'

describe.concurrent('path resolve', () => {
  it('import', () => {
    const directory = createDirectory('playground/src/app', 'index.tsx')
    const importPath = createImportPath(directory)

    expect(importPath).toStrictEqual<typeof importPath>([
      {
        importPath: path.join(process.cwd(), 'playground/src/app/index.tsx'),
        source: 'playground/src/app/index.tsx',
      },
      {
        importPath: path.join(
          process.cwd(),
          'playground/src/app/[input]/index.tsx',
        ),
        source: 'playground/src/app/[input]/index.tsx',
      },
      {
        importPath: path.join(
          process.cwd(),
          'playground/src/app/_index/index.tsx',
        ),
        source: 'playground/src/app/_index/index.tsx',
      },
      {
        importPath: path.join(
          process.cwd(),
          'playground/src/app/[input]/_index/index.tsx',
        ),
        source: 'playground/src/app/[input]/_index/index.tsx',
      },
    ])
    expect(createImportPath([])).toStrictEqual([])
  })
  it('browser', () => {
    const directory = createDirectory('playground/src/app', 'index.tsx')
    const browserPath = createBrowserPath(
      directory,
      'playground/src/app',
      'index.tsx',
    )

    expect(browserPath).toStrictEqual<typeof browserPath>([
      {
        browserPath: '/',
        source: 'playground/src/app/index.tsx',
      },
      {
        browserPath: '/:input',
        source: 'playground/src/app/[input]/index.tsx',
      },
      {
        browserPath: '/_index',
        source: 'playground/src/app/_index/index.tsx',
      },
      {
        browserPath: '/:input/_index',
        source: 'playground/src/app/[input]/_index/index.tsx',
      },
    ])
    expect(
      createBrowserPath([], 'playground/src/app', 'index.tsx'),
    ).toStrictEqual([])
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
        source: 'playground/src/app/index.tsx',
      },
      {
        browserPath: '/:input',
        importPath: path.join(
          process.cwd(),
          'playground/src/app/[input]/index.tsx',
        ),
        source: 'playground/src/app/[input]/index.tsx',
      },
      {
        browserPath: '/_index',
        importPath: path.join(
          process.cwd(),
          'playground/src/app/_index/index.tsx',
        ),
        source: 'playground/src/app/_index/index.tsx',
      },
      {
        browserPath: '/:input/_index',
        importPath: path.join(
          process.cwd(),
          'playground/src/app/[input]/_index/index.tsx',
        ),
        source: 'playground/src/app/[input]/_index/index.tsx',
      },
    ]

    expect(
      createBrowserPath(importPath, 'playground/src/app', 'index.tsx'),
    ).toStrictEqual<Mixin>(mixinOut)
    expect(createImportPath(browserPath)).toStrictEqual<Mixin>(mixinOut)
  })
})
