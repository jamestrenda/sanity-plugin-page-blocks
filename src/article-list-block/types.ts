import {
  ArrayOfObjectsComponents,
  ArrayOfPrimitivesComponents,
  ReferenceTo,
  StringComponents,
} from 'sanity'

import {SchemaBaseFields, SchemaFieldBaseFields} from '../types'

/**
 * Configuration options for the Article List Block.
 *
 * @public
 */
export interface ArticleListBlockConfig extends SchemaBaseFields {
  title?:
    | ({
        components?: StringComponents | undefined
      } & SchemaFieldBaseFields)
    | false
  articles?: {
    schemaType: ReferenceTo
    components?: ArrayOfObjectsComponents | ArrayOfPrimitivesComponents | undefined
  } & SchemaFieldBaseFields
}
