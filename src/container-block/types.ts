import {ArrayOfType} from 'sanity'

import {CustomImageType, SchemaBaseFields, SchemaFieldBaseFields, StringFieldType} from '../types'

/**
 * Configuration options for the Container Block.
 *
 * @public
 */
export interface ContainerBlockConfig extends SchemaBaseFields {
  title?: Omit<StringFieldType, 'type'> | false
  image?: CustomImageType
  content: {
    of: ArrayOfType[]
  } & SchemaFieldBaseFields
}
