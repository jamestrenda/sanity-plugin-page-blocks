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
  blocks?: {
    of: ArrayOfType[]
  } & SchemaFieldBaseFields
  /**
   * @deprecated Use `blocks` instead.
   * @remarks
   * The `content` field is deprecated and will be removed in a future release.
   * Migrate to the `blocks` property, which aligns with existing naming conventions.
   */
  content?:
    | false
    | ({
        of: ArrayOfType[]
      } & SchemaFieldBaseFields)
}
