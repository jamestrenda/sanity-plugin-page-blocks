import {LayoutListIcon} from 'lucide-react'
import {defineField, defineType, SchemaTypeDefinition} from 'sanity'

import {ArticleListBlockConfig} from '.'

const title = 'Article List'
export const schema = (options: ArticleListBlockConfig): SchemaTypeDefinition =>
  defineType({
    name: options?.name ?? 'articleListBlock',
    title,
    type: 'object',
    icon: () => <LayoutListIcon size="1em" />,
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
        type: 'string',
        options: {
          list: options?.articleTypes ?? [{title: 'Post', value: 'post'}],
        },
        validation: (Rule) => Rule.required(),
      }),
      options?.header ??
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'Optional title to display above the article list.',
        }),
      options?.categoryField ??
        defineField({
          name: 'categories',
          title: 'Filter by Categories',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'category'}]}],
          description: 'Optional: Show only articles from selected categories.',
        }),
      ...(options?.customFields ?? []),
    ],
    components: options?.customComponents,
  })
