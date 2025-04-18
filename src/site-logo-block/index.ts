import {definePlugin} from 'sanity'

import {schema} from './schema'
import {SiteLogoBlockConfig} from './types'

/**
 * @public
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {siteLogoBlock} from '@trenda/sanity-plugin-page-blocks
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [siteLogoBlock()],
 * })
 * ```
 */
export const siteLogoBlock = definePlugin<SiteLogoBlockConfig>((config) => {
  return {
    name: '@trenda/sanity-plugin-page-blocks/site-logo-block',
    schema: {
      types: [schema(config)],
    },
  }
})
