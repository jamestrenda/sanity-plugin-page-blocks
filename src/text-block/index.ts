import {definePlugin} from 'sanity'

import {schema} from './schema'
import {TextBlockConfig} from './types'

/**
 * @public
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {textBlock} from '@trenda/sanity-plugin-page-blocks
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [textBlock()],
 * })
 * ```
 */
export const textBlock = definePlugin<TextBlockConfig>((config = undefined) => {
  return {
    name: '@trenda/sanity-plugin-page-blocks/text-block',
    schema: {
      types: [schema(config)],
    },
  }
})
