import path from 'node:path'
import { expect, test } from 'vitest'
import { createDirectory } from '../src/core/directory'
import { createBrowserPath, createImportPath } from '../src/core/path'
import { createStructure } from '../src/core/structure'

test("react-router's route object schema", () => {
  const directory = createDirectory('playground/src/app', 'index.tsx')

  const importPath = createImportPath(directory)
  const browserPath = createBrowserPath(
    importPath,
    'playground/src/app',
    'index.tsx',
  )

  const structure = createStructure(browserPath)

  expect(structure).toEqual<typeof structure>([
    {
      browserPath: '/',
      children: [
        {
          browserPath: ':input',
          children: [],
          importPath: path.join(
            process.cwd(),
            'playground/src/app/[input]/index.tsx',
          ),
          metadata: void 0,
          source: 'playground/src/app/[input]/index.tsx',
        },
      ],
      importPath: path.join(process.cwd(), 'playground/src/app/index.tsx'),
      metadata: void 0,
      source: 'playground/src/app/index.tsx',
    },
  ])
})
