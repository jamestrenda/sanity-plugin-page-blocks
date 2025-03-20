import {RssIcon} from 'lucide-react'
import {defineField, defineType, FieldGroupDefinition, SchemaTypeDefinition} from 'sanity'

import {isFieldHidden, mergeGroups} from '../lib/utils'
import type {ArticleFeedBlockConfig} from './types'

const title = 'Article Feed'

// no default groups for this schema
const GROUPS: FieldGroupDefinition[] = []

export const schema = (options: ArticleFeedBlockConfig): SchemaTypeDefinition => {
  const groups = mergeGroups<FieldGroupDefinition>(GROUPS, options?.groups)

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
        components: isFieldHidden(options?.title) ? undefined : options?.title?.components,
        fieldset: isFieldHidden(options?.title)
          ? undefined
          : (options?.title?.fieldset ?? undefined),
        group: isFieldHidden(options?.title) ? undefined : (options?.title?.group ?? undefined),
      }),
    defineField({
      name: 'filter',
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
      components: isFieldHidden(options?.filterBy) ? undefined : options?.filterBy?.components,
      fieldset: isFieldHidden(options?.filterBy)
        ? undefined
        : (options?.filterBy?.fieldset ?? undefined),
      group: isFieldHidden(options?.filterBy) ? undefined : (options?.filterBy?.group ?? undefined),
    }),
    ...(options?.customFields ?? []),
  ]

  const visibleFields = fields.filter(({name}) => {
    return !isFieldHidden(options?.[name as keyof ArticleFeedBlockConfig])
  })

  return defineType({
    name: options?.name ?? 'articleFeedBlock',
    title,
    type: 'object',
    fieldsets: [...(options?.fieldsets ?? [])],
    groups,
    icon: () => <RssIcon size="1em" />,
    preview: options?.preview ?? {
      select: {
        title: 'title',
      },
      prepare(selection) {
        return {
          title: selection.title ?? title,
          subtitle: selection.title ? title : undefined,
        }
      },
    },
    fields: visibleFields,
    components: options?.components,
  })
}
