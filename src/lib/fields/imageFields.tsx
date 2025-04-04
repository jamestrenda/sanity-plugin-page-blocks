import {defineField} from 'sanity'
import {CustomImageType} from '../../types'

export const imageFields = (options?: Exclude<CustomImageType, false>) => [
  defineField({
    name: 'file',
    title: 'File',
    type: 'image',
    options: {
      hotspot: true,
    },
    validation: options?.file?.validation,
  }),
  defineField({
    name: 'altText',
    title: 'Alt Text',
    type: 'string',
    description: 'Override the alt text for this asset',
    validation: options?.altText?.validation,
  }),
  defineField({
    name: 'caption',
    title: 'Caption',
    type: 'string',
    validation: options?.caption?.validation,
  }),
]
