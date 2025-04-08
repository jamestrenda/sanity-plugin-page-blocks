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
  ValidationBuilder,
} from 'sanity'

import {CustomImageType, SchemaBaseFields, TextType} from '../types'

interface Config extends SchemaBaseFields {
  text?: TextType
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
