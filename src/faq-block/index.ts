import {definePlugin} from 'sanity'

import {schema} from './schema'
import {FaqBlockConfig} from './types'

/**
 * @public
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {faqBlock} from '@trenda/sanity-plugin-page-blocks
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [faqBlock()],
 * })
 * ```
 */
export const faqBlock = definePlugin<FaqBlockConfig>((config) => {
  return {
    name: '@trenda/sanity-plugin-page-blocks/faq-block',
    schema: {
      types: [schema(config)],
    },
  }
})
