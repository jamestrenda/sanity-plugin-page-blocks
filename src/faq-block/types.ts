import {
  ArrayOfObjectsComponents,
  ArrayOfPrimitivesComponents,
  FieldDefinition,
  FieldDefinitionBase,
  ReferenceTo,
  StringComponents,
} from 'sanity'

import {SchemaBaseFields} from '../types'

interface Config extends SchemaBaseFields {
  header?: FieldDefinition
  title?:
    | {
        fieldset?: FieldDefinitionBase['fieldset']
        group?: FieldDefinitionBase['group']
        components?: StringComponents | undefined
      }
    | false
  faqs?: {
    schemaType: ReferenceTo
    fieldset?: FieldDefinitionBase['fieldset']
    group?: FieldDefinitionBase['group']
    components?: ArrayOfObjectsComponents | ArrayOfPrimitivesComponents | undefined
  }
}

/**
 * Configuration options for the Article List Block.
 *
 * @public
 */
export type FaqBlockConfig = Config | void
