import {
  ArrayOfObjectsComponents,
  ArrayOfPrimitivesComponents,
  ArrayOfType,
  BlockListDefinition,
  BlockMarksDefinition,
  BlockStyleDefinition,
  FieldDefinition,
  ReferenceTo,
  StringComponents,
} from 'sanity'

import {SchemaBaseFields, SchemaFieldBaseFields} from '../types'

interface Config extends SchemaBaseFields {
  text?:
    | false
    | ({type: 'string'; components?: StringComponents} & SchemaFieldBaseFields)
    | ({
        type?: undefined
        styles?: BlockStyleDefinition[]
        lists?: BlockListDefinition[]
        decorators?: BlockMarksDefinition['decorators']
        annotations?: BlockMarksDefinition['annotations']
        blocks?: ArrayOfType[]
        components?: ArrayOfPrimitivesComponents | ArrayOfObjectsComponents
      } & SchemaFieldBaseFields)
  actions:
    | false
    | {
        max?: number
        internal: {
          types: ReferenceTo
        }
        customFields?: FieldDefinition[]
      }
}

/**
 * Configuration options for the Hero Block.
 *
 * @public
 */
export type HeroBlockConfig = Config | void
