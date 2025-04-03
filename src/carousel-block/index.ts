import {definePlugin} from 'sanity'

import {schema} from './schema'
import {CarouselBlockConfig} from './types'

/**
 * @public
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {carouselBlock} from '@trenda/sanity-plugin-page-blocks
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [carouselBlock()],
 * })
 * ```
 */
export const carouselBlock = definePlugin<CarouselBlockConfig>((config) => {
  return {
    name: '@trenda/sanity-plugin-page-blocks/carousel-block',
    schema: {
      types: [schema(config)],
    },
  }
})
