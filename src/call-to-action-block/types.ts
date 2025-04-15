import {ArrayRule, ValidationBuilder} from 'sanity'
import {ActionType, CustomImageType, SchemaBaseFields, StringFieldType, TextType} from '../types'

interface Config extends SchemaBaseFields {
  title?: Omit<StringFieldType, 'type'> | false
  text?: TextType
  image?: CustomImageType
  actions?: ActionType & {
    validation?: ValidationBuilder<ArrayRule<unknown[]>, unknown[]> | undefined
  }
}

/**
 * Configuration options for the CallToAction Block.
 *
 * @public
 */
export type CallToActionBlockConfig = Config | void
