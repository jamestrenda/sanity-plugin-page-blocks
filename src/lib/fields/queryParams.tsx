import {FileQuestionIcon} from 'lucide-react'
import {defineField, FieldDefinition} from 'sanity'

import {Description} from '../components/Description'

export type Props = {
  group?: string
  fieldset?: string
}

export const queryParams = ({group, fieldset}: Props = {}): FieldDefinition => {
  return defineField({
    name: 'params',
    title: 'Query Params',
    type: 'array',
    description: (
      <Description>
        Add key-value pairs to be used as parameters in the URL.{' '}
        <a href="https://www.semrush.com/blog/url-parameters/" target="_blank" rel="noreferrer">
          What are Query Params?
        </a>
      </Description>
    ),
    of: [
      {
        type: 'object',
        preview: {
          select: {
            key: 'key',
            value: 'value',
          },
          prepare: ({key, value}) => ({
            title: `${key}=${value}`,
            media: <FileQuestionIcon size="1em" />,
          }),
        },
        fields: [
          {
            name: 'key',
            title: 'Key',
            type: 'string',
          },
          {
            name: 'value',
            title: 'Value',
            type: 'string',
          },
        ],
      },
    ],
    group: group ?? undefined,
    fieldset: fieldset ?? undefined,
  })
}
