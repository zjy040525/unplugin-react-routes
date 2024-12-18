import ts from 'typescript'
import { type createStructure } from './structure'

export const createAST = <T extends ReturnType<typeof createStructure>>(
  sources: T,
) => {
  const createRoutesSchema = (deepNode: T) => {
    return deepNode.map((node) => {
      const pairs = [
        node.browserPath === '_index'
          ? ts.factory.createPropertyAssignment(
              ts.factory.createIdentifier('index'),
              ts.factory.createTrue(),
            )
          : ts.factory.createPropertyAssignment(
              ts.factory.createIdentifier('path'),
              ts.factory.createStringLiteral(node.browserPath),
            ),
        ts.factory.createMethodDeclaration(
          void 0,
          void 0,
          ts.factory.createIdentifier('lazy'),
          void 0,
          void 0,
          [],
          void 0,
          ts.factory.createBlock(
            [
              ts.factory.createReturnStatement(
                ts.factory.createCallExpression(
                  // @ts-expect-error
                  ts.factory.createToken(ts.SyntaxKind.ImportKeyword),
                  void 0,
                  [ts.factory.createStringLiteral(node.importPath)],
                ),
              ),
            ],
            true,
          ),
        ),
      ]

      if (node.children.length) {
        pairs.push(
          ts.factory.createPropertyAssignment(
            ts.factory.createIdentifier('children'),
            ts.factory.createArrayLiteralExpression(
              createRoutesSchema(node.children as T),
              true,
            ),
          ),
        )
      }

      return ts.factory.createObjectLiteralExpression(pairs, true)
    })
  }

  const routesSchema = ts.factory.createArrayLiteralExpression(
    createRoutesSchema(sources),
    true,
  )

  return [
    ts.factory.createVariableStatement(
      [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
      ts.factory.createVariableDeclarationList(
        [
          ts.factory.createVariableDeclaration(
            ts.factory.createIdentifier('routes'),
            void 0,
            void 0,
            routesSchema,
          ),
        ],
        ts.NodeFlags.Const,
      ),
    ),
  ]
}
