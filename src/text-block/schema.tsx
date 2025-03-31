import {TextIcon} from 'lucide-react'
import {defineField, SchemaTypeDefinition} from 'sanity'

import {createFieldConfig, createSchema} from '../lib/utils/createSchema'
import {getPortableTextBlocks} from '../lib/utils/getPortableTextBlocks'
import {getPortableTextPreview} from '../lib/utils/getPortableTextPreview'
import {TextBlockConfig} from './types'

export const schema = (options: TextBlockConfig = undefined): SchemaTypeDefinition => {
  const blockTitle = 'Text Block'

  return createSchema({
    name: 'textBlock',
    title: blockTitle,
    icon: () => <TextIcon size="1em" />,
    fields: [
      defineField({
        name: 'text',
        title: 'Text',
        description: 'The text content of the block.',
        type: options?.portableText?.type ?? 'array',
        of: options?.portableText?.of ?? [
          ...getPortableTextBlocks({
            styles: options?.text?.styles,
            lists: options?.text?.lists,
            decorators: options?.text?.decorators,
            annotations: options?.text?.annotations,
          }),
          ...(options?.text?.blocks ?? []), // Add any additional block types defined by the user
        ],
        ...createFieldConfig(options?.text),
      }),
      ...(options?.customFields ?? []),
    ],
    options: options
      ? {
          preview: {
            select: {
              text: 'text',
            },
            prepare(selection) {
              const preview = getPortableTextPreview(selection.text, blockTitle)

              return preview
            },
          },
          ...options,
        }
      : undefined,
  })
}
