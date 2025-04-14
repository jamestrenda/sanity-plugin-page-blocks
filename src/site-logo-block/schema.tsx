import {ImageIcon} from 'lucide-react'
import {defineField, ObjectDefinition, PreviewConfig} from 'sanity'

import {
  // createFieldConfig,
  createSchema,
} from '../lib/utils/createSchema'
import LogoReferenceInput from './input'
import {SiteLogoBlockConfig} from './types'

export const schema = (options: SiteLogoBlockConfig): ObjectDefinition => {
  const blockTitle = 'Site Logo'
  const preview: PreviewConfig = {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || blockTitle,
        subtitle: title ? `${blockTitle} Block` : undefined,
        media: <ImageIcon size="1em" />,
      }
    },
  }

  return createSchema({
    name: 'siteLogoBlock',
    title: 'Site Logo',
    icon: () => <ImageIcon size="1em" />,
    fields: [
      defineField({
        name: 'logo',
        title: ' ',
        type: 'image',
        components: {
          input: (props) => (
            <LogoReferenceInput {...props} query={options?.query} params={options?.params} />
          ),
        },
        // ...createFieldConfig(options)
      }),
      ...(options?.customFields ?? []),
    ],
    options: options
      ? {
          preview,
          ...options,
        }
      : {},
  })
}
