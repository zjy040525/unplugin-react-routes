import { type createBrowserPath, type createImportPath } from './path'

export const createStructure = <
  T extends ReturnType<typeof createBrowserPath>[number] &
    ReturnType<typeof createImportPath>[number],
>(
  sources: T[],
) => {
  type DeepModule<P> = P & {
    children: DeepModule<P>[]
  }

  const sourceMap: Record<string, DeepModule<T>> = {}
  sources.forEach((source) => {
    sourceMap[source.browserPath] = {
      ...source,
      children: [],
    }
  })
  const res: DeepModule<T>[] = []
  sources.forEach((source) => {
    if (source.browserPath !== '/') {
      const pathSplit = source.browserPath.split('/').filter(Boolean)
      const parentPath = '/' + pathSplit.slice(0, -1).join('/')
      if (sourceMap[parentPath]) {
        const [childPath] = pathSplit.slice(-1)
        sourceMap[parentPath].children.push({
          ...sourceMap[source.browserPath],
          browserPath: childPath,
        })
      } else {
        res.push(sourceMap[source.browserPath])
      }
    } else {
      res.push(sourceMap[source.browserPath])
    }
  })
  return res
}
