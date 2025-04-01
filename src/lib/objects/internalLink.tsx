import {Link2Icon} from 'lucide-react'
import type {PreviewConfig, PreviewValue, ReferenceTo, ValidationContext} from 'sanity'
import {defineField, defineType} from 'sanity'

import {prepareOutput} from '../utils/misc'

export const icon = <Link2Icon size="1em" />

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
  const defaultTitle = 'Internal Link'
  const subtitle = path || `${prefix ? `${prefix}.` : ''}document.title`

  if (outputOnly) {
    return prepareOutput({title: _title ?? subtitle ?? defaultTitle, subtitle, media: icon})
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

export const internalLink = (types: ReferenceTo) =>
  defineType({
    title: 'Reference',
    name: 'link',
    type: 'object',
    icon,
    preview: preview() as PreviewConfig,
    fields: [
      defineField({
        name: 'document',
        type: 'reference',
        title: 'To',
        description: 'Select an internal document to link to',
        validation: (Rule) =>
          Rule.custom((doc, context: ValidationContext) => {
            const parent = context.parent
            if (!doc && !Object.hasOwn(parent as object, 'anchor')) {
              return 'A document or anchor must be defined'
            }
            return true
          }),
        to: types,
        options: {
          disableNew: true,
          filter: '!(_id in path("drafts.**"))',
        },
      }),
    ],
  })
