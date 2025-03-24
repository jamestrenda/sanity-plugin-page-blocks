import {Link2Icon} from 'lucide-react'
import type {ReferenceTo, ValidationContext} from 'sanity'
import {defineField, defineType} from 'sanity'

export const icon = <Link2Icon size="1em" />

export const internalLink = (types: ReferenceTo) =>
  defineType({
    title: 'Reference',
    name: 'link',
    type: 'object',
    icon,
    preview: {
      select: {
        title: 'document.title',
      },
      prepare({title}) {
        return {
          title,
        }
      },
    },
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
