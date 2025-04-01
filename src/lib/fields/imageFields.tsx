import {defineField} from 'sanity'

export const imageFields = [
  defineField({
    name: 'image',
    title: 'File',
    type: 'image',
    options: {
      hotspot: true,
    },
  }),
  defineField({
    name: 'altText',
    title: 'Alt Text',
    type: 'string',
    description: 'Override the alt text for this asset',
  }),
  defineField({
    name: 'caption',
    title: 'Caption',
    type: 'string',
  }),
]
