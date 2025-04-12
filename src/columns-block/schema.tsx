import {Columns3Icon, SquareDashedIcon} from 'lucide-react'
import {defineField, ObjectDefinition, PreviewConfig} from 'sanity'

import {createFieldConfig, createSchema} from '../lib/utils/createSchema'
import {getDisplayImage} from '../lib/utils/getDisplayImageField'
import {ColumnsBlockConfig} from './types'

export const schema = (options: ColumnsBlockConfig): ObjectDefinition => {
  const blockTitle = 'Columns'
  const preview: PreviewConfig = {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || blockTitle,
        subtitle: title ? `${blockTitle} Block` : undefined,
        media: <Columns3Icon size="1em" />,
      }
    },
  }

  return createSchema({
    name: 'columnsBlock',
    title: 'Columns',
    icon: () => <Columns3Icon size="1em" />,
    fields: [
      // defineField({
      //   name: 'columns',
      //   title: 'Columns',
      //   type: 'array',
      //   of: [{ name: 'column', title: 'Column', type: 'column' }],
      //   validation: (Rule) => Rule.max(3),
      //   options: {
      //     layout: 'grid',
      //   },
      // }),

      defineField({
        name: 'columns',
        title: 'Columns',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'column',
            title: 'Column',
            icon: SquareDashedIcon,
            fields: [
              {name: 'title', title: 'Title', type: 'string'},
              {
                name: 'blocks',
                title: 'Blocks',
                type: 'array',
                of: options?.columns.of ?? [],
              },
            ],
          },
        ],
        options: {
          layout: 'grid',
        },
        validation: (Rule) => Rule.min(1),
        ...createFieldConfig(options.columns),
      }),
      ...(options.customFields ?? []),
    ],
    options: options
      ? {
          preview,
          ...options,
        }
      : {},
  })
}
