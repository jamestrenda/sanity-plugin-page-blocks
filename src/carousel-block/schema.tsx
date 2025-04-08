import {GalleryThumbnailsIcon} from 'lucide-react'
import {defineField, PreviewConfig, SchemaTypeDefinition} from 'sanity'

import {createFieldConfig, createSchema} from '../lib/utils/createSchema'
import {CarouselBlockConfig} from './types'

export const schema = (options: CarouselBlockConfig): SchemaTypeDefinition => {
  const blockTitle = 'Carousel'
  const preview: PreviewConfig = {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || blockTitle,
        subtitle: title ? `${blockTitle} Block` : undefined,
        media: <GalleryThumbnailsIcon size="1em" />,
      }
    },
  }

  return createSchema({
    name: 'carouselBlock',
    title: 'Carousel',
    icon: () => <GalleryThumbnailsIcon size="1em" />,
    fields: [
      ...(options?.title === false
        ? []
        : [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              ...createFieldConfig(options?.title),
            }),
          ]),
      defineField({
        name: 'items',
        title: 'Items',
        type: 'array',
        of: options?.items.of ?? [],
        validation: (Rule) => Rule.min(2),
        ...createFieldConfig(options?.items),
      }),
      ...(options?.customFields ?? []),
    ],
    options: options
      ? {
          preview,
          ...options,
        }
      : {},
  })
}
