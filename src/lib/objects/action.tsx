import {ArrowRightIcon, Link2Icon} from 'lucide-react'
import {defineField, defineType, QueryParams, ReferenceTo} from 'sanity'

import {anchorField} from '../fields/anchor'
import {externalLinkField} from '../fields/externalLink'
import {internalLinkField} from '../fields/internalLink'
import {queryParams} from '../fields/queryParams'
import {icon as ExternalLinkIcon} from '../objects/externalLink'
import {icon as InternalLinkIcon} from '../objects/internalLink'

export const action = (types: ReferenceTo) =>
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
        description: 'Add an internal reference, external link, or relative URL.',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'internal',
            title: 'Internal Link',
            icon: InternalLinkIcon,
            fields: [internalLinkField(types), anchorField, queryParams()],
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
                  subtitle += `/${slug}`
                }
                if (params) {
                  subtitle += `?${params.map(({key, value}: QueryParams) => `${key}=${value}`).join('&')}`
                }
                if (anchor) {
                  subtitle += `#${anchor}`
                }
                return {
                  title,
                  subtitle,
                }
              },
            },
          },
          {
            type: 'object',
            name: 'external',
            title: 'External Link',
            icon: ExternalLinkIcon,
            fields: [externalLinkField],
            preview: {
              select: {
                url: 'link.url',
              },
              prepare(selection) {
                const {url} = selection

                return {
                  title: url,
                }
              },
            },
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
        ],
        validation: (Rule) => Rule.max(1),
      }),
    ],
  })
