import {ArrowRightIcon, CrownIcon} from 'lucide-react'
import {defineField, PreviewConfig, SchemaTypeDefinition} from 'sanity'

import {actionField} from '../lib/fields/action'
import {icon as ExternalLinkIcon} from '../lib/objects/externalLink'
import {icon as InternalLinkIcon} from '../lib/objects/internalLink'
import {createFieldConfig, createSchema} from '../lib/utils/createSchema'
import {getPortableTextBlocks} from '../lib/utils/getPortableTextBlocks'
import {getPortableTextPreview} from '../lib/utils/getPortableTextPreview'
import {HeroBlockConfig} from './types'

export const schema = (options: HeroBlockConfig): SchemaTypeDefinition => {
  const blockTitle = 'Hero'

  const textDescription =
    'The main text of the hero block. This is typically a value proposition or a short headline.'
  // "Write an effective value proposition that's clear, concise, and compelling. Identify who your target customer is, what problem you solve, and what makes your solution unique."

  const defaultStyles = [
    {
      title: 'Normal',
      value: 'normal',
    },
    {
      title: 'H1',
      value: 'h1',
    },
  ]

  const text = options?.text

  const defaultTextFieldBase = defineField({
    name: 'text',
    title: 'Text',
    description: textDescription,
    type: 'array',
    of: [],
  })

  // Determine the text field dynamically
  const textField = (() => {
    // remove the field if valueProposition is false
    if (text === false) return defaultTextFieldBase

    // use the default field if the user doesn't pass any customizations for valueProposition
    if (!text) {
      return defineField({
        ...defaultTextFieldBase,
        of: [
          ...getPortableTextBlocks({
            styles: defaultStyles,
          }),
        ],
      })
    }

    // use a simple string field if the valueProposition is a string
    if (text.type === 'string') {
      return defineField({
        name: defaultTextFieldBase.name,
        title: defaultTextFieldBase.title,
        type: 'string',
        description: textDescription,
        ...createFieldConfig(text),
      })
    }

    // Merge user-defined properties with defaults
    return defineField({
      ...defaultTextFieldBase,
      of: [
        ...getPortableTextBlocks({
          styles: text.styles ?? defaultStyles,
          lists: text.lists ?? [],
          decorators: text.decorators ?? undefined,
          annotations: text.annotations ?? undefined,
        }),
        ...(text.blocks ?? []), // Add any additional block types defined by the user
      ],
      components: text.components ?? undefined,
      fieldset: text.fieldset ?? undefined,
      group: text.group ?? undefined,
    })
  })()

  // Determine the preview dynamically
  const preview = ((): PreviewConfig | undefined => {
    if (text === false || text?.type === 'string') return undefined

    return {
      select: {
        text: 'text',
      },
      prepare(selection) {
        return getPortableTextPreview(selection.text, blockTitle)
      },
    }
  })()

  return createSchema({
    name: 'heroBlock',
    title: 'Hero',
    icon: () => <CrownIcon size="1em" />,
    fields: [
      textField,
      defineField({
        name: 'image',
        title: 'Image',
        type: 'image',
        // description: 'Optional. The main image of the hero block.',
      }),
      defineField({
        name: 'actions',
        title: 'Actions',
        type: 'array',
        description: 'Add a call-to-action button or link to direct visitors to a specific page.',
        of:
          options?.actions && options?.actions.internal
            ? [
                {
                  type: 'object',
                  name: 'action',
                  title: 'Action',
                  fields: [actionField(options?.actions?.internal?.types)],
                  preview: {
                    select: {
                      title: 'action.text',
                      to: 'action.to[0]',
                      internalTitle: 'action.to.0.link.document.title',
                      internalSlug: 'action.to.0.link.document.slug.current',
                      internalAnchor: 'action.to[0].anchor',
                      internalParams: 'action.to[0].params',
                    },
                    prepare(selection) {
                      const {title, to} = selection

                      const type = to?._type

                      switch (type) {
                        case 'internal': {
                          const {internalTitle, internalSlug, internalAnchor, internalParams} =
                            selection
                          let subtitle = ''
                          if (internalSlug) {
                            subtitle += `/${internalSlug}`
                          }
                          if (internalParams) {
                            subtitle += `?${internalParams
                              .map(
                                ({key, value}: {key: string; value: string}) => `${key}=${value}`,
                              )
                              .join('&')}`
                          }
                          if (internalAnchor) {
                            subtitle += `#${internalAnchor}`
                          }
                          return {
                            title: title || internalTitle || 'Untitled',
                            subtitle,
                            media: InternalLinkIcon,
                          }
                        }
                        case 'external':
                          return {
                            title,
                            subtitle: to.link.url,
                            media: ExternalLinkIcon,
                          }
                        case 'relative':
                          return {
                            title,
                            subtitle: to.url,
                            media: <ArrowRightIcon size="1em" />,
                          }
                        default:
                          return {
                            title,
                          }
                      }
                    },
                  },
                },
              ]
            : [],
        validation: (Rule) => {
          const max =
            typeof options?.actions === 'object' && options.actions.max
              ? options.actions.max
              : undefined
          return max ? Rule.max(max) : Rule
        },
      }),
    ],
    options: options
      ? {
          preview,
          ...options,
        }
      : {},
  })
}
