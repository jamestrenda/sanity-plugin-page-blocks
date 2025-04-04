import {definePlugin} from 'sanity'

import {schema} from './schema'
import {ContainerBlockConfig} from './types'

/**
 * @public
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {containerBlock} from '@trenda/sanity-plugin-page-blocks
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [containerBlock()],
 * })
 * ```
 */
export const containerBlock = definePlugin<ContainerBlockConfig>((config) => {
  return {
    name: '@trenda/sanity-plugin-page-blocks/container-block',
    schema: {
      types: [schema(config)],
    },
  }
})
