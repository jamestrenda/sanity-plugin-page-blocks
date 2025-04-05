import {RssIcon} from 'lucide-react'
import {defineField, ObjectDefinition} from 'sanity'

import {createFieldConfig, createSchema, isFieldHidden} from '../lib/utils/createSchema'
import type {ArticleFeedBlockConfig} from './types'

export const schema = (options: ArticleFeedBlockConfig): ObjectDefinition => {
  const blockTitle = 'Article Feed'

  const fields = [
    defineField({
      name: 'articleType',
      title: 'Article Type',
      description: 'Select the type of articles to display.',
      type: 'string',
      options: {
        list: options?.articleTypes ?? [{title: 'Post', value: 'post'}],
      },
      validation: (Rule) => Rule.required(),
      components: options?.articleType?.components,
      fieldset: options?.articleType?.fieldset ?? undefined,
      group: options?.articleType?.group ?? undefined,
    }),
    options?.header ??
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'Optional title to display above the article feed.',
        ...createFieldConfig(options?.header ?? {}),
      }),
    defineField({
      name: 'filterBy',
      title: 'Filter by',
      type: 'array',
      of:
        !isFieldHidden(options?.filterBy) && options?.filterBy?.schemaType
          ? [
              {
                type: 'reference',
                to: options?.filterBy?.schemaType,
              },
            ]
          : [],
      description: 'Optional: Show only articles that match the selected filter.',
      ...createFieldConfig(options?.filterBy ?? {}),
    }),
    ...(options?.customFields ?? []),
  ]

  return createSchema({
    name: 'articleFeedBlock',
    title: blockTitle,
    icon: () => <RssIcon size="1em" />,
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
