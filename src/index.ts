import ts from 'typescript'
import { createUnplugin, UnpluginFactory } from 'unplugin'
import { name } from '../package.json'
import { createAST } from './core/ast'
import { createDirectory } from './core/directory'
import { createBrowserPath, createImportPath } from './core/path'
import { createStructure } from './core/structure'
import { type Options } from './options'

const virtualModuleId = 'virtual:react-routes'
const resolvedVirtualModuleId = '\0' + virtualModuleId

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
  options = {},
) => ({
  name,
  enforce: 'post',
  resolveId(id) {
    if (id === virtualModuleId) {
      return resolvedVirtualModuleId
    }
  },
  load(id) {
    if (id === resolvedVirtualModuleId) {
      const { entry = 'src/app', index = 'index.tsx' } = options
      const directory = createDirectory(entry, index)
      const browserPath = createBrowserPath(directory, entry, index)
      const importPath = createImportPath(browserPath)
      const structure = createStructure(importPath)
      const ast = createAST(structure)

      const tsFile = ts.factory.createSourceFile(
        ast,
        ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
        ts.NodeFlags.None,
      )

      const tsCode = ts.createPrinter().printFile(tsFile)
      const jsCode = ts.transpileModule(tsCode, {
        compilerOptions: {
          module: ts.ModuleKind.ESNext,
          target: ts.ScriptTarget.ESNext,
        },
      })

      return jsCode.outputText
    }
  },
})

export const unplugin = createUnplugin(unpluginFactory)

export default unplugin
