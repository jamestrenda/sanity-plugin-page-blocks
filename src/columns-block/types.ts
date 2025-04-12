import {ArrayOfType, ArrayRule, FieldDefinition, ValidationBuilder} from 'sanity'

import {SchemaBaseFields, SchemaFieldBaseFields} from '../types'

/**
 * Configuration options for the Columns Block.
 *
 * @public
 */
export interface ColumnsBlockConfig extends SchemaBaseFields {
  columns: {
    of: ArrayOfType[]
  } & SchemaFieldBaseFields & {
      validation?: ValidationBuilder<ArrayRule<unknown[]>, unknown[]> | undefined
      customFields?: FieldDefinition[]
    }
}
