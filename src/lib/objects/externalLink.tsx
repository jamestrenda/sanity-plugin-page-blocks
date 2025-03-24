import {ExternalLinkIcon} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const icon = <ExternalLinkIcon size="1em" />

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
  preview: {
    select: {
      url: 'url',
    },
    prepare(selection) {
      const {url} = selection

      return {
        title: url,
      }
    },
  },
})
