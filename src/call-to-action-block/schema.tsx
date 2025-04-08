import {ArrowRightIcon, MousePointerClickIcon} from 'lucide-react'
import {defineField, ObjectDefinition, PreviewConfig, PreviewValue} from 'sanity'

import {actionField} from '../lib/fields/action'
import {preview as externalLinkPreview} from '../lib/objects/externalLink'
import {preview as internalLinkPreview} from '../lib/objects/internalLink'
import {preview as mediaLinkPreview} from '../lib/objects/mediaLink'
import {createFieldConfig, createSchema} from '../lib/utils/createSchema'
import {getDisplayImage} from '../lib/utils/getDisplayImageField'
import {getPortableTextPreview} from '../lib/utils/getPortableTextPreview'
import {getTextField} from '../lib/utils/getTextField'
import {CallToActionBlockConfig} from './types'

export const icon = () => <MousePointerClickIcon size="1em" />

export const schema = (options: CallToActionBlockConfig): ObjectDefinition => {
  // @ts-expect-error make sure users can't disable the actions field
  if (options?.actions === false) {
    throw new Error("callToActionBlock: 'actions: false' is not a supported configuration option.")
  }
  const blockTitle = 'Call to Action'

  // Determine the preview dynamically
  const preview = ((): PreviewConfig | undefined => {
    if (options?.text && options?.text?.type === 'string') return undefined

    return {
      select: {
        text: 'text',
        title: 'title',
      },
      prepare({text, title}) {
        if (title) {
          return {
            title: title,
            subtitle: blockTitle,
            media: icon,
          }
        }
        if (text && !title) {
          return getPortableTextPreview(text, blockTitle)
        }

        return {
          title: blockTitle,
          media: icon,
        }
      },
    }
  })()

  return createSchema({
    name: 'callToActionBlock',
    title: blockTitle,
    icon,
    fields: [
      ...(options?.title === false
        ? []
        : [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: options?.title?.validation,
              ...createFieldConfig(options?.title),
            }),
          ]),
      getTextField(
        options?.text,
        {
          styles: [
            {
              title: 'Normal',
              value: 'normal',
            },
            {
              title: 'H2',
              value: 'h2',
            },
          ],
        },
        'The main text of the call to action block.',
      ),
      ...(options?.image === false ? [] : [getDisplayImage(options?.image)]),
      defineField({
        name: 'actions',
        title: 'Actions',
        type: 'array',
        description: 'Add a call-to-action button or link to direct visitors to a specific page.',
        of: [
          {
            type: 'object',
            name: 'action',
            title: 'Action',
            fields: [actionField(options?.actions)],
            preview: {
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
                      title,
                    }
                }
              },
            },
          },
        ],
        validation: options?.actions?.validation,
      }),
      ...(options?.customFields ?? []),
    ],
    options: options
      ? {
          preview,
          ...options,
        }
      : {preview},
  })
}
