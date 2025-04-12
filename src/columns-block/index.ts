import {definePlugin} from 'sanity'

import {schema} from './schema'
import {ColumnsBlockConfig} from './types'

/**
 * @public
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {columnsBlock} from '@trenda/sanity-plugin-page-blocks
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [columnsBlock()],
 * })
 * ```
 */
export const columnsBlock = definePlugin<ColumnsBlockConfig>((config) => {
  return {
    name: '@trenda/sanity-plugin-page-blocks/columns-block',
    schema: {
      types: [schema(config)],
    },
  }
})
