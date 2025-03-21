import {
  ArrayOfObjectsComponents,
  ArrayOfPrimitivesComponents,
  FieldDefinition,
  FieldDefinitionBase,
  StringComponents,
  TitledListValue,
} from 'sanity'

import {SchemaBaseFields} from '../types'

/**
 * Configuration options for the Article List Block.
 *
 * @public
 */
export interface ArticleListBlockConfig extends SchemaBaseFields {
  articleTypes: (string | Required<Pick<TitledListValue<string>, 'title' | 'value'>>)[]
  header?: FieldDefinition
  title?:
    | {
        fieldset?: FieldDefinitionBase['fieldset']
        group?: FieldDefinitionBase['group']
        components?: StringComponents | undefined
      }
    | false
  articles?: {
    fieldset?: FieldDefinitionBase['fieldset']
    group?: FieldDefinitionBase['group']
    components?: ArrayOfObjectsComponents | ArrayOfPrimitivesComponents | undefined
  }
}
