import {MessageCircleQuestionIcon} from 'lucide-react'
import {defineField, SchemaTypeDefinition} from 'sanity'

import {createFieldConfig, createSchema} from '../lib/utils/createSchema'
import type {FaqBlockConfig} from './types'

export const schema = (options: FaqBlockConfig): SchemaTypeDefinition => {
  const blockTitle = 'FAQ Block'

  const fields = [
    options?.header ??
      defineField({
        name: 'title',
        type: 'string',
        description: 'Optional title to display above the FAQs.',
        ...createFieldConfig(options?.header ?? {}),
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
      ...createFieldConfig(options?.faqs ?? {}),
      validation: (Rule) => Rule.required().unique(),
    }),
    ...(options?.customFields ?? []),
  ]

  return createSchema({
    name: 'faqBlock',
    title: 'FAQs',
    icon: () => <MessageCircleQuestionIcon size="1em" />,
    fields,
    options: options
      ? {
          preview: {
            select: {
              title: 'title',
            },
            prepare(selection) {
              return {
                title: selection.title ?? blockTitle,
                subtitle: selection.title ? blockTitle : undefined,
              }
            },
          },
          ...options,
        }
      : {},
  })
}
