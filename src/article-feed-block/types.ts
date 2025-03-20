import {
  ArrayOfObjectsComponents,
  ArrayOfPrimitivesComponents,
  FieldDefinition,
  FieldDefinitionBase,
  ReferenceTo,
  StringComponents,
  TitledListValue,
} from 'sanity'

import {SchemaBaseFields} from '../types'

interface Config extends SchemaBaseFields {
  articleTypes?: (string | TitledListValue<string>)[] | undefined
  header?: FieldDefinition
  articleType?: {
    fieldset?: FieldDefinitionBase['fieldset']
    group?: FieldDefinitionBase['group']
    components?: StringComponents | undefined
  }
  title?:
    | {
        fieldset?: FieldDefinitionBase['fieldset']
        group?: FieldDefinitionBase['group']
        components?: StringComponents | undefined
      }
    | false
  filterBy?:
    | {
        schemaType: ReferenceTo
        fieldset?: FieldDefinitionBase['fieldset']
        group?: FieldDefinitionBase['group']
        components?: ArrayOfObjectsComponents | ArrayOfPrimitivesComponents | undefined
      }
    | false
}

/**
 * Configuration options for the Article Feed Block.
 *
 * @public
 */
export type ArticleFeedBlockConfig = Config | void
