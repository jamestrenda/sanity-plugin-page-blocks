import {ObjectRule, ValidationBuilder} from 'sanity'
import {ActionType, SchemaBaseFields} from '../types'

interface Config extends SchemaBaseFields, ActionType {
  validation?: ValidationBuilder<ObjectRule, Record<string, unknown>> | undefined
}

/**
 * Configuration options for the Action Block.
 *
 * @public
 */
export type ActionBlockConfig = Config | void
