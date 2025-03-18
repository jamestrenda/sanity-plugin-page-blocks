import {
  defineField,
  definePlugin,
  defineType,
  DocumentComponents,
  FieldDefinition,
  FieldGroupDefinition,
  FieldsetDefinition,
  PreviewConfig,
  SchemaTypeDefinition,
  TitledListValue,
} from 'sanity'

import {ArticleListBlockFieldNames, schema} from './schema'

// Allows assigning default fields to user-defined groups
type GroupAssignment = {
  field: ArticleListBlockFieldNames // Type-checked against existing fields
  group: string | string[] // Can be any string from user-defined groups
}

type FieldsetAssignment = {
  field: ArticleListBlockFieldNames
  fieldset: string
}

type SchemaBaseFields = {
  name?: string
  fieldsets?: Array<FieldsetDefinition>
  fieldsetAssignments?: Array<FieldsetAssignment>
  groups?: Array<FieldGroupDefinition>
  groupAssignments?: Array<GroupAssignment>
  preview?: PreviewConfig
  customFields?: Array<FieldDefinition>
  customComponents?: DocumentComponents
}

export type ArticleListBlockConfig =
  | (SchemaBaseFields & {
      articleTypes?: (string | TitledListValue<string>)[] | undefined
      header?: FieldDefinition
      categoryField?: FieldDefinition
      maxArticles?: number
    })
  | void

/**
 * @public
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
