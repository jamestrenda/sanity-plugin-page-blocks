import {ImageIcon, InfoIcon, SquareDashedIcon} from 'lucide-react'
import {defineField, ObjectDefinition, PreviewConfig} from 'sanity'

import {createFieldConfig, createSchema} from '../lib/utils/createSchema'
import {getDisplayImage} from '../lib/utils/getDisplayImageField'
import {SiteLogoBlockConfig} from './types'
import LogoReferenceInput from './input'

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
      // defineField({
      //   name: 'note',
      //   type: 'note',
      //   description: 'No customizable settings available.',
      //   options: {
      //     icon: () => <InfoIcon size="1em" />,
      //     tone: 'primary',
      //   },
      // }),
      // // make sure the block is not empty so that it is saved to the array
      // defineField({
      //   name: 'show',
      //   type: 'boolean',
      //   initialValue: true,
      //   hidden: true,
      // }),
      defineField({
        name: 'logo',
        title: 'Site Logo',
        type: 'image',
        components: {
          input: (props) => <LogoReferenceInput {...props} query={options.query} />,
        },
      }),
      ...(options.customFields ?? []),
    ],
    options: options
      ? {
          preview,
          ...options,
        }
      : {},
  })
}
