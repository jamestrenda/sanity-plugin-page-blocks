import {
  defineField,
  definePlugin,
  defineType,
  DocumentComponents,
  FieldDefinition,
  PreviewConfig,
  SchemaTypeDefinition,
  TitledListValue,
} from 'sanity'
import {schema} from './schema'

export type ArticleListBlockConfig = {
  name?: string
  articleTypes?: (string | TitledListValue<string>)[] | undefined
  header?: FieldDefinition
  categoryField?: FieldDefinition
  customFields?: Array<FieldDefinition>
  customComponents?: DocumentComponents
  maxArticles?: number
  preview?: PreviewConfig
} | void

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {articleListBlock} from '@trenda/sanity-plugin-article-list-block'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [articleListBlock()],
 * })
 * ```
 */
export const articleListBlock = definePlugin<ArticleListBlockConfig>((config) => {
  let types: SchemaTypeDefinition[] = []
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
