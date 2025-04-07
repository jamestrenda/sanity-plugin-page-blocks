import {SquareDashedIcon} from 'lucide-react'
import {defineField, ObjectDefinition, PreviewConfig} from 'sanity'

import {createFieldConfig, createSchema} from '../lib/utils/createSchema'
import {getDisplayImage} from '../lib/utils/getDisplayImageField'
import {ContainerBlockConfig} from './types'

export const schema = (options: ContainerBlockConfig): ObjectDefinition => {
  const blockTitle = 'Container'
  const preview: PreviewConfig = {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || blockTitle,
        subtitle: title ? `${blockTitle} Block` : undefined,
        media: <SquareDashedIcon size="1em" />,
      }
    },
  }

  return createSchema({
    name: 'containerBlock',
    title: 'Container',
    icon: () => <SquareDashedIcon size="1em" />,
    fields: [
      ...(options.title === false
        ? []
        : [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: options.title?.validation,
              ...createFieldConfig(options.title),
            }),
          ]),
      defineField({
        name: 'content',
        title: 'Content',
        type: 'array',
        of: options.content.of ?? [],
        validation: (Rule) => Rule.min(1),
        ...createFieldConfig(options.content),
      }),
      ...(options.image === false ? [] : [getDisplayImage(options.image)]),
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
