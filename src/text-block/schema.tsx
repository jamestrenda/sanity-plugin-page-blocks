import {TextIcon} from 'lucide-react'
import {defineField, defineType, FieldGroupDefinition, SchemaTypeDefinition} from 'sanity'

import {getPortableTextPreview, mergeGroups} from '../lib/utils'
import {TextBlockConfig} from './types'

const title = 'Text Block'

// no default groups for this schema
const GROUPS: FieldGroupDefinition[] = []

export const schema = (options: TextBlockConfig = undefined): SchemaTypeDefinition => {
  const groups = mergeGroups<FieldGroupDefinition>(GROUPS, options?.groups)
  return defineType({
    name: options?.name ?? 'textBlock',
    title,
    type: 'object',
    fieldsets: [...(options?.fieldsets ?? [])],
    groups,
    icon: () => <TextIcon size="1em" />,
    fields: [
      defineField({
        name: 'text',
        title: 'Text',
        description: 'The text content of the block.',
        type: options?.portableText?.type ?? 'array',
        of: options?.portableText?.of ?? [{type: 'block'}],
        components: options?.text?.components,
        fieldset: options?.text?.fieldset ?? undefined,
        group: options?.text?.group ?? undefined,
      }),
      ...(options?.customFields ?? []),
    ],
    preview: options?.preview ?? {
      select: {
        text: 'text',
      },
      prepare(selection) {
        const preview = getPortableTextPreview(selection.text, 'Text Block')

        return preview
      },
    },

    components: options?.components,
  })
}
