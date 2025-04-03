import {ArrayOfType, StringComponents} from 'sanity'

import {SchemaBaseFields, SchemaFieldBaseFields} from '../types'

interface Config extends SchemaBaseFields {
  title?:
    | ({
        components?: StringComponents | undefined
      } & SchemaFieldBaseFields)
    | false
  items: {
    of: ArrayOfType[]
  } & SchemaFieldBaseFields
}

/**
 * Configuration options for the Hero Block.
 *
 * @public
 */
export type CarouselBlockConfig = Config | void
