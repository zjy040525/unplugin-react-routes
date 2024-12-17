import fg from 'fast-glob'
import { importFromStringSync } from 'module-from-string'
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

export interface Metadata {
  nested?: boolean
}

export const createDirectory = (entry: string, index: string) => {
  return fg
    .globSync(`${entry}/**/${index}`, {
      cwd: process.cwd(),
    })
    .map((source) => {
      let metadata: Metadata | undefined

      const sourcePath = path.join(process.cwd(), source)
      const sourceCode = fs.readFileSync(sourcePath, 'utf-8')
      const sourceFile = ts.createSourceFile(
        source,
        sourceCode,
        ts.ScriptTarget.ESNext,
      )

      const variableStatements = sourceFile.statements.filter((statement) =>
        ts.isVariableStatement(statement),
      )
      variableStatements.forEach((statement) => {
        const variableDeclarationList = statement.declarationList
        variableDeclarationList.declarations.forEach((variableDeclaration) => {
          if (
            ts.isVariableDeclaration(variableDeclaration) &&
            variableDeclaration.name.getText(sourceFile) === 'metadata' &&
            statement.modifiers?.some(
              (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
            ) &&
            statement.declarationList.flags === ts.NodeFlags.Const
          ) {
            const metadataFile = ts.factory.createSourceFile(
              [
                ts.factory.createVariableStatement(
                  [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
                  ts.factory.createVariableDeclarationList(
                    [variableDeclaration],
                    ts.NodeFlags.Const,
                  ),
                ),
              ],
              ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
              ts.NodeFlags.None,
            )

            const tsCode = ts.createPrinter().printFile(metadataFile)
            const jsCode = ts.transpileModule(tsCode, {
              compilerOptions: {
                module: ts.ModuleKind.ESNext,
                target: ts.ScriptTarget.ESNext,
              },
            })

            try {
              metadata = importFromStringSync(jsCode.outputText)
                .metadata as Metadata
            } catch (error) {
              // ...
            }
          }
        })
      })

      return {
        source,
        metadata,
      }
    })
}
