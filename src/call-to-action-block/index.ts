import {definePlugin} from 'sanity'

import {schema} from './schema'
import {CallToActionBlockConfig} from './types'

/**
 * @public
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {callToActionBlock} from '@trenda/sanity-plugin-page-blocks
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [callToActionBlock()],
 * })
 * ```
 */
export const callToActionBlock = definePlugin<CallToActionBlockConfig>((config) => {
  return {
    name: '@trenda/sanity-plugin-page-blocks/call-to-action-block',
    schema: {
      types: [schema(config)],
    },
  }
})
