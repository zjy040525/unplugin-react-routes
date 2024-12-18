export interface Options {
  /**
   * relative paths to the directory to search for pages.
   * @default "src/app"
   */
  readonly entry?: string
  /**
   * specify the file name as the routing page file.
   * @default "index.tsx"
   */
  readonly index?: string
}
