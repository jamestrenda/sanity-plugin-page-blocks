import {BlockStyleDefinition, defineField} from 'sanity'

import {TextType} from '../../types'
import {createFieldConfig} from './createSchema'
import {getPortableTextBlocks} from './getPortableTextBlocks'

export function getTextField(
  options?: TextType,
  styles: BlockStyleDefinition[] = [
    {
      title: 'Normal',
      value: 'normal',
    },
    {
      title: 'H2',
      value: 'h2',
    },
  ],
) {
  const text = options

  const defaultTextFieldBase = defineField({
    name: 'text',
    title: 'Text',
    type: 'array',
    of: [],
    validation: (Rule) => Rule.required(),
  })

  // Determine the text field dynamically

  // remove the field if text is false
  if (text === false) return defaultTextFieldBase

  // use the default field if the user doesn't pass any customizations for text
  if (!text) {
    return defineField({
      ...defaultTextFieldBase,
      of: [
        ...getPortableTextBlocks({
          styles,
        }),
      ],
    })
  }

  // use a simple string field if the text is a string
  if (text.type === 'string') {
    return defineField({
      name: defaultTextFieldBase.name,
      title: defaultTextFieldBase.title,
      type: 'string',
      ...createFieldConfig(text),
    })
  }

  // Merge user-defined properties with defaults
  return defineField({
    ...defaultTextFieldBase,
    of: [
      ...getPortableTextBlocks({
        styles: text.styles ?? styles,
        lists: text.lists ?? [],
        decorators: text.decorators ?? undefined,
        annotations: text.annotations ?? undefined,
      }),
      ...(text.blocks ?? []), // Add any additional block types defined by the user
    ],
    ...createFieldConfig(text),
  })
}
