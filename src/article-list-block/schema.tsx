import {LayoutListIcon} from 'lucide-react'
import {defineField, defineType, FieldGroupDefinition, SchemaTypeDefinition} from 'sanity'

import {mergeGroups} from '../lib/utils'
import type {ArticleListBlockConfig} from './types'

const title = 'Article List'

// no default groups for this schema
const GROUPS: FieldGroupDefinition[] = []

export const schema = (options: ArticleListBlockConfig): SchemaTypeDefinition => {
  const groups = mergeGroups<FieldGroupDefinition>(GROUPS, options?.groups)

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
    fields: [
      options.header ??
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'Optional title to display above the article list.',
          group: options?.groupAssignments?.find((group) => group.field === 'title')?.group,
        }),
      defineField({
        name: 'articles',
        title: 'Articles',
        description: 'Select documents to display in the list.',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: options.articleTypes.sort().map((type) => {
              if (typeof type === 'string') {
                return {type: type.toLocaleLowerCase()}
              }
              return {type: type.value.toLocaleLowerCase()}
            }),
          },
        ],
        validation: (Rule) => Rule.required().unique(),
        fieldset: options.fieldsetAssignments?.find((assignment) => assignment.field === 'articles')
          ?.fieldset,
        group: options.groupAssignments?.find((group) => group.field === 'articles')?.group,
      }),
      ...(options.customFields ?? []),
    ],
    components: options.customComponents,
  })
}
