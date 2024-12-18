import fg from 'fast-glob'

export const createDirectory = (entry: string, index: string) => {
  return fg
    .globSync(`${entry}/**/${index}`, {
      cwd: process.cwd(),
    })
    .map((source) => {
      // Metadata will be reintroduced in a future version.
      return {
        source,
      }
    })
}
