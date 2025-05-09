import {definePlugin} from 'sanity'

import {schema} from './schema'
import {ArticleFeedBlockConfig} from './types'

/**
 * @public
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {articleFeedBlock} from '@trenda/sanity-plugin-page-blocks
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [articleFeedBlock()],
 * })
 * ```
 */
export const articleFeedBlock = definePlugin<ArticleFeedBlockConfig>((config) => {
  return {
    name: '@trenda/sanity-plugin-page-blocks/article-feed-block',
    schema: {
      types: [schema(config)],
    },
  }
})
