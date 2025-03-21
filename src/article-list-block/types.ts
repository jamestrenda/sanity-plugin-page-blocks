import {
  ArrayOfObjectsComponents,
  ArrayOfPrimitivesComponents,
  FieldDefinition,
  FieldDefinitionBase,
  ReferenceTo,
  StringComponents,
} from 'sanity'

import {SchemaBaseFields} from '../types'

/**
 * Configuration options for the Article List Block.
 *
 * @public
 */
export interface ArticleListBlockConfig extends SchemaBaseFields {
  header?: FieldDefinition
  title?:
    | {
        fieldset?: FieldDefinitionBase['fieldset']
        group?: FieldDefinitionBase['group']
        components?: StringComponents | undefined
      }
    | false
  articles?: {
    schemaType: ReferenceTo
    fieldset?: FieldDefinitionBase['fieldset']
    group?: FieldDefinitionBase['group']
    components?: ArrayOfObjectsComponents | ArrayOfPrimitivesComponents | undefined
  }
}
