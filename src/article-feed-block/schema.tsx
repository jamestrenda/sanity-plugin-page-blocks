import {RssIcon} from 'lucide-react'
import {defineField, defineType, FieldGroupDefinition, SchemaTypeDefinition} from 'sanity'

import {mergeGroups} from '../lib/utils'
import type {ArticleFeedBlockConfig} from './types'

const title = 'Article Feed'

// no default groups for this schema
const GROUPS: FieldGroupDefinition[] = []

export const schema = (options: ArticleFeedBlockConfig): SchemaTypeDefinition => {
  const groups = mergeGroups<FieldGroupDefinition>(GROUPS, options?.groups)

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
    fields: [
      defineField({
        name: 'articleType',
        title: 'Article Type',
        description: 'Select the type of articles to display.',
        type: 'string',
        options: {
          list: options?.articleTypes ?? [{title: 'Post', value: 'post'}],
        },
        validation: (Rule) => Rule.required(),
        fieldset: options?.fieldsetAssignments?.find(
          (assignment) => assignment.field === 'articleType',
        )?.fieldset,
        group: options?.groupAssignments?.find((group) => group.field === 'articleType')?.group,
      }),
      options?.header ??
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'Optional title to display above the article feed.',
          group: options?.groupAssignments?.find((group) => group.field === 'title')?.group,
        }),
      options?.categoryField ??
        defineField({
          name: 'categories',
          title: 'Filter by Categories',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'category'}]}],
          description: 'Optional: Show only articles from selected categories.',
          group: options?.groupAssignments?.find((group) => group.field === 'categories')?.group,
        }),
      ...(options?.customFields ?? []),
    ],
    components: options?.customComponents,
  })
}
