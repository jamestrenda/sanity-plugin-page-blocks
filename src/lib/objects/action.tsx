import {ArrowRightIcon, Link2Icon} from 'lucide-react'
import React from 'react'
import {
  defineField,
  defineType,
  FieldDefinition,
  PreviewConfig,
  PreviewValue,
  QueryParams,
} from 'sanity'

import {ActionType} from '../../types'
import {anchorField} from '../fields/anchor'
import {externalLinkField} from '../fields/externalLink'
import {internalLinkField} from '../fields/internalLink'
import {mediaLinkField} from '../fields/mediaLink'
import {queryParams} from '../fields/queryParams'
import {icon as ExternalLinkIcon, preview as externalLinkPreview} from '../objects/externalLink'
import {icon as InternalLinkIcon, preview as internalLinkPreview} from '../objects/internalLink'
import {icon as MediaLinkIcon, preview as mediaLinkPreview} from '../objects/mediaLink'

export const action = (options?: ActionType) =>
  defineType({
    name: 'action',
    title: 'Action',
    type: 'object',
    icon: <Link2Icon size="1em" />,
    preview: {
      select: {
        title: 'text',
      },
      prepare({title}) {
        return {
          title,
        }
      },
    },
    fields: [
      defineField({
        name: 'text',
        title: 'Text',
        type: 'string',
      }),

      defineField({
        name: 'to',
        title: 'To (Choose one)',
        description: 'Link to an internal reference, external or relative URL, or a file.',
        type: 'array',
        of: [
          ...(options?.internal && options.internal.types
            ? [
                defineType({
                  type: 'object',
                  name: 'internal',
                  title: 'Internal Link',
                  icon: InternalLinkIcon,
                  fields: [internalLinkField(options.internal.types), anchorField, queryParams()],
                  preview: {
                    select: {
                      title: 'link.document.title',
                      slug: 'link.document.slug.current',
                      anchor: 'anchor',
                      params: 'params',
                    },
                    prepare({title, slug, anchor, params}) {
                      let subtitle = ''
                      if (slug) {
                        subtitle += `${String(slug).startsWith('/') ? '' : '/'}${slug}`
                      }
                      if (params) {
                        subtitle += `?${params.map(({key, value}: QueryParams) => `${key}=${value}`).join('&')}`
                      }
                      if (anchor) {
                        subtitle += `#${anchor}`
                      }

                      return internalLinkPreview({
                        title,
                        path: subtitle,
                        outputOnly: true,
                      }) as PreviewValue
                    },
                  },
                }) as FieldDefinition,
              ]
            : []),
          {
            type: 'object',
            name: 'external',
            title: 'External Link',
            icon: ExternalLinkIcon,
            fields: [externalLinkField],
            preview: externalLinkPreview({
              prefix: 'link',
            }) as PreviewConfig,
          },
          {
            name: 'relative',
            title: 'Relative URL',
            type: 'object',
            icon: <ArrowRightIcon size="1em" />,
            fields: [
              defineField({
                name: 'url',
                title: 'Relative URL',
                description: 'Example: /a-relative-url',
                type: 'string',
                validation: (Rule) => Rule.required(),
              }),
            ],
          },
          {
            type: 'object',
            name: 'media',
            title: 'Media Link',
            icon: MediaLinkIcon,
            fields: [mediaLinkField],
            preview: mediaLinkPreview({
              prefix: 'link',
            }) as PreviewConfig,
          },
        ].filter(Boolean),
        validation: (Rule) => Rule.required().max(1),
      }),

      ...(options?.customFields ?? []),
    ],
  })
