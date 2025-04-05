import {ExternalLinkIcon} from 'lucide-react'
import React from 'react'
import {defineField, defineType, PreviewConfig, PreviewValue} from 'sanity'

import {prepareOutput} from '../utils/misc'

export const icon = <ExternalLinkIcon size="1em" />

export const preview = ({
  path = '',
  prefix = '',
  outputOnly = false,
  title: _title,
}: {
  path?: string
  prefix?: string
  outputOnly?: boolean
} & PreviewValue = {}): PreviewConfig | PreviewValue => {
  const defaultTitle = 'External Link'
  const subtitle = path || `${prefix ? `${prefix}.` : ''}url`

  if (outputOnly) {
    return prepareOutput({
      title: _title ?? subtitle ?? defaultTitle,
      subtitle: _title ? subtitle : undefined,
      media: icon,
    })
  }

  return {
    select: {
      title: _title ?? subtitle ?? defaultTitle,
    },
    prepare({title}) {
      return prepareOutput({
        title: title ?? subtitle,
        media: icon,
      })
    },
  }
}

export const externalLink = defineType({
  title: 'External Link',
  name: 'link',
  type: 'object',
  icon,
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https', 'tel', 'mailto']}),
    }),
    defineField({
      title: 'Open in a new window?',
      name: 'newWindow',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: preview() as PreviewConfig,
})
