import {MessageCircleQuestionIcon} from 'lucide-react'
import {defineField, defineType, FieldGroupDefinition, SchemaTypeDefinition} from 'sanity'

import {isFieldHidden, mergeGroups} from '../lib/utils'
import type {FaqBlockConfig} from './types'

const title = 'FAQ Block'

// no default groups for this schema
const GROUPS: FieldGroupDefinition[] = []

export const schema = (options: FaqBlockConfig): SchemaTypeDefinition => {
  const groups = mergeGroups<FieldGroupDefinition>(GROUPS, options?.groups)

  const fields = [
    options?.header ??
      defineField({
        name: 'title',
        type: 'string',
        description: 'Optional title to display above the FAQs.',
        fieldset: isFieldHidden(options?.title)
          ? undefined
          : (options?.title?.fieldset ?? undefined),
        group: isFieldHidden(options?.title) ? undefined : (options?.title?.group ?? undefined),
        components: isFieldHidden(options?.title) ? undefined : options?.title?.components,
      }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      description: 'Select FAQ documents to display in the list.',
      type: 'array',
      of: options?.faqs?.schemaType
        ? [
            {
              type: 'reference',
              to: options?.faqs?.schemaType,
            },
          ]
        : [],
      components: options?.faqs?.components,
      fieldset: options?.faqs?.fieldset ?? undefined,
      group: options?.faqs?.group ?? undefined,
      validation: (Rule) => Rule.required().unique(),
    }),
    ...(options?.customFields ?? []),
  ]

  const visibleFields = fields.filter(({name}) => {
    return !isFieldHidden(options?.[name as keyof FaqBlockConfig])
  })

  return defineType({
    name: options?.name ?? 'faqBlock',
    title: 'FAQs',
    type: 'object',
    fieldsets: [...(options?.fieldsets ?? [])],
    groups,
    icon: () => <MessageCircleQuestionIcon size="1em" />,
    preview: options?.preview ?? {
      select: {
        title: 'title',
      },
      prepare(selection) {
        return {
          title: selection.title ?? title,
          subtitle: selection.title ? title : undefined,
        }
      },
    },
    fields: visibleFields,
    components: options?.components,
  })
}
