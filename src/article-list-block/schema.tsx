import {LayoutListIcon} from 'lucide-react'
import {defineField, ObjectDefinition} from 'sanity'

import {createFieldConfig, createSchema} from '../lib/utils/createSchema'
import {BlockSchema} from '../types'
import type {ArticleListBlockConfig} from './types'

export const schema = (options: ArticleListBlockConfig): ObjectDefinition => {
  const blockTitle = 'Article List'

  const fields = [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional title to display above the article list.',
      ...createFieldConfig(options?.title ? options.title : {}),
    }),
    defineField({
      name: 'articles',
      title: 'Articles',
      description: 'Select documents to display in the list.',
      type: 'array',
      of: options.articles?.schemaType
        ? [
            {
              type: 'reference',
              to: options?.articles?.schemaType,
            },
          ]
        : [],
      validation: (Rule) => Rule.required().unique(),
      ...createFieldConfig(options?.articles),
    }),
    ...(options.customFields ?? []),
  ]

  return createSchema({
    name: 'articleListBlock',
    title: blockTitle,
    icon: () => <LayoutListIcon size="1em" />,
    fields,
    options: options
      ? {
          preview: {
            select: {
              title: 'title',
            },
            prepare(selection) {
              return {
                title: selection.title ?? blockTitle,
                subtitle: selection.title ? blockTitle : undefined,
              }
            },
          },
          ...options,
        }
      : undefined,
  })
}
export type ArticleListBlockSchema = BlockSchema
