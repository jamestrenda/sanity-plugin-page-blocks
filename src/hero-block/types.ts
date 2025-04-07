import {
  ArrayOfObjectsComponents,
  ArrayOfPrimitivesComponents,
  ArrayOfType,
  ArrayRule,
  BlockListDefinition,
  BlockMarksDefinition,
  BlockStyleDefinition,
  FieldDefinition,
  ReferenceTo,
  StringComponents,
  ValidationBuilder,
} from 'sanity'

import {CustomImageType, SchemaBaseFields, SchemaFieldBaseFields} from '../types'

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
        validation?: ValidationBuilder<ArrayRule<unknown[]>, unknown[]> | undefined
      } & SchemaFieldBaseFields)
  image?: CustomImageType
  actions?:
    | false
    | {
        internal?: {
          types: ReferenceTo
        }
        validation?: ValidationBuilder<ArrayRule<unknown[]>, unknown[]> | undefined
        customFields?: FieldDefinition[]
      }
}

/**
 * Configuration options for the Hero Block.
 *
 * @public
 */
export type HeroBlockConfig = Config | void

/**
 * Configuration options for Hero Block actions.
 *
 * @public
 */
export type HeroActionsType = Exclude<Config['actions'], false | undefined>
