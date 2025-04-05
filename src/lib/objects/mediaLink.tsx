import {FileDownIcon} from 'lucide-react'
import React from 'react'
import {defineField, defineType, PreviewConfig, PreviewValue} from 'sanity'

import {prepareOutput} from '../utils/misc'

export const icon = <FileDownIcon size="1em" />

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
  const defaultTitle = 'Media Link'
  const subtitle = path || `${prefix ? `${prefix}.` : ''}file.asset.originalFilename`

  if (outputOnly) {
    return prepareOutput({title: _title ?? subtitle ?? defaultTitle, media: icon})
  }

  return {
    select: {
      title: _title ?? subtitle ?? defaultTitle,
    },
    prepare({title}) {
      return prepareOutput({title, media: icon})
    },
  }
}

export const mediaLink = defineType({
  title: 'Media',
  name: 'link',
  type: 'object',
  icon,
  preview: preview() as PreviewConfig,
  fields: [
    defineField({
      name: 'file',
      type: 'file',
      title: 'File',
      description: 'Select a file to link to',
    }),
  ],
})
