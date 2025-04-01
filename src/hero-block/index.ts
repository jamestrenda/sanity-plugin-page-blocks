import {definePlugin} from 'sanity'

import {schema} from './schema'
import {HeroBlockConfig} from './types'

/**
 * @public
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {heroBlock} from '@trenda/sanity-plugin-page-blocks
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [heroBlock()],
 * })
 * ```
 */
export const heroBlock = definePlugin<HeroBlockConfig>((config) => {
  return {
    name: '@trenda/sanity-plugin-page-blocks/hero-block',
    schema: {
      types: [schema(config)],
    },
  }
})
