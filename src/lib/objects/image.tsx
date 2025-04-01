import {ImageIcon} from 'lucide-react'
import {defineType, FieldDefinition} from 'sanity'

import {imageFields} from '../fields/imageFields'

export const Icon = () => <ImageIcon size="1em" />

export const title = 'Image'

export const customImage = (fields: FieldDefinition[] = imageFields) => {
  return defineType({
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
  })
}
export function getImageObjectTitle() {
  return title
}
