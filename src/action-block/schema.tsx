import {ArrowRightIcon, MousePointerClickIcon} from 'lucide-react'
import {ObjectDefinition, PreviewConfig, PreviewValue} from 'sanity'

import {actionField} from '../lib/fields/action'
import {createSchema} from '../lib/utils/createSchema'

import {preview as externalLinkPreview} from '../lib/objects/externalLink'
import {preview as internalLinkPreview} from '../lib/objects/internalLink'
import {preview as mediaLinkPreview} from '../lib/objects/mediaLink'
import {ActionBlockConfig} from './types'

export const icon = () => <MousePointerClickIcon size="1em" />

export const schema = (options: ActionBlockConfig): ObjectDefinition => {
  // if (options?.actions === false) {
  //   throw new Error("callToActionBlock: 'actions: false' is not a supported configuration option.")
  // }
  const blockTitle = 'Action'

  // Determine the preview dynamically
  const preview = ((): PreviewConfig | undefined => {
    return {
      select: {
        title: 'action.text',
        to: 'action.to[0]',
        internalTitle: 'action.to.0.link.document.title',
        internalSlug: 'action.to.0.link.document.slug.current',
        internalAnchor: 'action.to[0].anchor',
        internalParams: 'action.to[0].params',
        mediaFilename: 'action.to.0.link.file.asset.originalFilename',
      },
      prepare(selection) {
        const {title, to} = selection

        const type = to?._type

        switch (type) {
          case 'internal': {
            const {internalTitle, internalSlug, internalAnchor, internalParams} = selection
            let subtitle = ''
            if (internalSlug) {
              subtitle += `${String(internalSlug).startsWith('/') ? '' : '/'}${internalSlug}`
            }
            if (internalParams) {
              subtitle += `?${internalParams
                .map(({key, value}: {key: string; value: string}) => `${key}=${value}`)
                .join('&')}`
            }
            if (internalAnchor) {
              subtitle += `#${internalAnchor}`
            }

            return internalLinkPreview({
              title: title || internalTitle || 'Untitled',
              path: subtitle,
              outputOnly: true,
            }) as PreviewValue
          }
          case 'external':
            return externalLinkPreview({
              title,
              path: to.link.url,
              outputOnly: true,
            }) as PreviewValue
          case 'relative': {
            return {
              title,
              subtitle: to.url,
              media: <ArrowRightIcon size="1em" />,
            }
          }
          case 'media': {
            const {mediaFilename: path} = selection
            return mediaLinkPreview({title, path, outputOnly: true}) as PreviewValue
          }
          default:
            return {
              title: blockTitle,
              media: icon,
            }
        }
      },
    }
  })()

  return createSchema({
    name: 'actionBlock',
    title: blockTitle,
    icon,
    fields: [options ? actionField(options) : actionField(), ...(options?.customFields ?? [])],
    options: options
      ? {
          preview,
          ...options,
        }
      : {preview},
  })
}
