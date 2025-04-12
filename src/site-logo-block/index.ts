import {definePlugin} from 'sanity'

import {schema} from './schema'
import {SiteLogoBlockConfig} from './types'
import LogoReferenceInput from './input'

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
    // form: {
    //   components: {
    //     input: {
    //       // Register your custom input for image fields with a specific name or custom type
    //       logoReference: LogoReferenceInput,
    //     },
    //   },
    // },
  }
})
