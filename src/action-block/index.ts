import {definePlugin} from 'sanity'

import {schema} from './schema'
import {ActionBlockConfig} from './types'

/**
 * @public
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {ActionBlock} from '@trenda/sanity-plugin-page-blocks
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [ActionBlock()],
 * })
 * ```
 */
export const actionBlock = definePlugin<ActionBlockConfig>((config) => {
  return {
    name: '@trenda/sanity-plugin-page-blocks/action-block',
    schema: {
      types: [schema(config)],
    },
  }
})
