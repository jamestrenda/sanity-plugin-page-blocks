import {ImageIcon} from 'lucide-react'
import {defineField, FieldDefinition, ObjectDefinition} from 'sanity'

import {CustomImageType} from '../../types'
import {createFieldConfig} from '../utils/createSchema'
import {imageFields} from './imageFields'

export const Icon = () => <ImageIcon size="1em" />

export const title = 'Image'

export const imageField = (
  fields: FieldDefinition[] = imageFields(),
  config?: Exclude<CustomImageType, false>,
): ObjectDefinition =>
  defineField({
    name: 'customImage',
    title,
    type: 'object',
    icon: Icon,
    preview: {
      select: {
        filename: 'image.asset.originalFilename',
        altText: 'altText',
        caption: 'caption',
        globalAltText: 'image.asset.altText',
        media: 'image',
      },
      prepare({filename, altText, globalAltText, caption, media}) {
        return {
          title: caption ?? altText ?? globalAltText ?? filename,
          subtitle: title,
          media,
        }
      },
    },
    fields,
    validation: config?.validation,
    ...createFieldConfig({fieldset: config?.fieldset, group: config?.group}),
  })
