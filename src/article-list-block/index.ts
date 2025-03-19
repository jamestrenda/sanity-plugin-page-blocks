import {definePlugin} from 'sanity'

import {schema} from './schema'
import {ArticleListBlockConfig} from './types'

/**
 * @public
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {articleListBlock} from '@trenda/sanity-plugin-page-blocks
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [articleListBlock()],
 * })
 * ```
 */
export const articleListBlock = definePlugin<ArticleListBlockConfig>((config) => {
  return {
    name: '@trenda/sanity-plugin-page-blocks/article-list-block',
    schema: {
      types: [schema(config)],
    },
  }
})
