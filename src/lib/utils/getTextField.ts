import {BlockDefinition, BlockStyleDefinition, defineField} from 'sanity'

import {TextType} from '../../types'
import {createFieldConfig} from './createSchema'
import {getPortableTextBlocks, portableTextBlocks} from './getPortableTextBlocks'

export function getTextField(
  options?: TextType,
  blockDef: Omit<BlockDefinition, 'type' | 'name'> = {
    styles: portableTextBlocks.styles ?? [],
    marks: {
      decorators: portableTextBlocks.marks?.decorators ?? [],
      annotations: portableTextBlocks.marks?.annotations ?? [],
    },
  },
  description?: string,
) {
  const text = options

  const defaultTextFieldBase = defineField({
    name: 'text',
    title: 'Text',
    description,
    type: 'array',
    of: [],
  })

  // Determine the text field dynamically
  if (text === false) return defaultTextFieldBase

  // use the default field if the user doesn't pass any customizations for text
  if (!text) {
    return defineField({
      ...defaultTextFieldBase,
      of: [...getPortableTextBlocks(blockDef)],
      validation: (Rule) => Rule.required(),
    })
  }

  // use a simple string field if the text is a string
  if (text.type === 'string') {
    return defineField({
      name: defaultTextFieldBase.name,
      title: defaultTextFieldBase.title,
      description,
      type: 'string',
      validation: text.validation ? text.validation : (Rule) => Rule.required(),
      ...createFieldConfig(text),
    })
  }

  // Merge user-defined properties with defaults
  return defineField({
    ...defaultTextFieldBase,
    of: [
      ...getPortableTextBlocks({
        styles: text.styles ?? blockDef.styles,
        lists: text.lists ?? [],
        marks: {
          decorators: text?.marks?.decorators ?? undefined,
          annotations: text?.marks?.annotations ?? undefined,
        },
      }),
      ...(text.of ?? []), // Add any additional block types defined by the user
    ],
    validation: text.validation ?? defaultTextFieldBase.validation,
    ...createFieldConfig(text),
  })
}
