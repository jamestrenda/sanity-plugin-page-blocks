import {LayoutListIcon} from 'lucide-react'
import {defineField, defineType, FieldGroupDefinition, SchemaTypeDefinition} from 'sanity'

import {isFieldHidden, mergeGroups} from '../lib/utils'
import type {ArticleListBlockConfig} from './types'

const title = 'Article List'

// no default groups for this schema
const GROUPS: FieldGroupDefinition[] = []

export const schema = (options: ArticleListBlockConfig): SchemaTypeDefinition => {
  const groups = mergeGroups<FieldGroupDefinition>(GROUPS, options?.groups)

  const fields = [
    options.header ??
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'Optional title to display above the article list.',
        fieldset: isFieldHidden(options?.title)
          ? undefined
          : (options?.title?.fieldset ?? undefined),
        group: isFieldHidden(options?.title) ? undefined : (options?.title?.group ?? undefined),
        components: isFieldHidden(options?.title) ? undefined : options?.title?.components,
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
      fieldset: options?.articles?.fieldset ?? undefined,
      group: options?.articles?.group ?? undefined,
      components: options?.articles?.components,
    }),
    ...(options.customFields ?? []),
  ]

  const visibleFields = fields.filter(({name}) => {
    return !isFieldHidden(options?.[name as keyof ArticleListBlockConfig])
  })

  return defineType({
    name: options.name ?? 'articleListBlock',
    title,
    type: 'object',
    fieldsets: [...(options?.fieldsets ?? [])],
    groups,
    icon: () => <LayoutListIcon size="1em" />,
    preview: options.preview ?? {
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
    components: options.components,
  })
}
