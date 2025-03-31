import {
  ArrayOfObjectsComponents,
  ArrayOfPrimitivesComponents,
  ArrayOfType,
  BlockListDefinition,
  BlockMarksDefinition,
  BlockStyleDefinition,
  FieldDefinitionBase,
} from 'sanity'

import {SchemaBaseFields} from '../types'

type PortableTextConfig = {
  type: 'array'
  of: ArrayOfType[]
}
interface Config extends SchemaBaseFields {
  portableText?: PortableTextConfig
  text?: {
    styles?: BlockStyleDefinition[]
    lists?: BlockListDefinition[]
    decorators?: BlockMarksDefinition['decorators']
    annotations?: BlockMarksDefinition['annotations']
    blocks?: ArrayOfType[]
    fieldset?: FieldDefinitionBase['fieldset']
    group?: FieldDefinitionBase['group']
    components?: ArrayOfObjectsComponents | ArrayOfPrimitivesComponents | undefined
  }
}

/**
 * Configuration options for the Text Block.
 *
 * @public
 */
export type TextBlockConfig = Config | void
