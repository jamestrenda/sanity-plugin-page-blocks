import {ArrayOfType} from 'sanity'

import {SchemaBaseFields} from '../types'

type TextBlockFieldNames = 'text'

type PortableTextConfig = {
  type: 'array'
  of: ArrayOfType[]
}

interface Config extends SchemaBaseFields<TextBlockFieldNames> {
  portableText?: PortableTextConfig
}

/**
 * Configuration options for the Text Block.
 *
 * @public
 */
export type TextBlockConfig = Config | void
