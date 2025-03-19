import {defineField, definePlugin, defineType, SchemaTypeDefinition} from 'sanity'

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
    name: '@trenda/sanity-plugin-page-blocks/article-list-block',
    schema: {
      types: [...types, schema(config)],
    },
  }
})
