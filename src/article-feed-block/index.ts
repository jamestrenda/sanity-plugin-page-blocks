import {defineField, definePlugin, defineType, SchemaTypeDefinition} from 'sanity'

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
  const types: SchemaTypeDefinition[] = []
  if (!config || !config.categoryField) {
    const categories = defineType({
      name: 'category',
      title: 'Category',
      type: 'document',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'title',
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
      ],
    })
    types.push(categories)
  }

  return {
    name: '@trenda/sanity-plugin-page-blocks/article-feed-block',
    schema: {
      types: [...types, schema(config)],
    },
  }
})
