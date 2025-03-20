import {
  ArrayOfObjectsComponents,
  ArrayOfPrimitivesComponents,
  ArrayOfType,
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
