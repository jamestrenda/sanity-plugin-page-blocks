import {ActionsType, CustomImageType, SchemaBaseFields, StringFieldType, TextType} from '../types'

interface Config extends SchemaBaseFields {
  title?: Omit<StringFieldType, 'type'> | false
  text?: TextType
  image?: CustomImageType
  actions?: ActionsType
}

/**
 * Configuration options for the CallToAction Block.
 *
 * @public
 */
export type CallToActionBlockConfig = Config | void
