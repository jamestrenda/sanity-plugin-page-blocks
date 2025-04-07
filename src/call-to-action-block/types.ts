import {ActionsType, CustomImageType, SchemaBaseFields, TextType} from '../types'

interface Config extends SchemaBaseFields {
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
