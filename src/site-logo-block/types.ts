import {FieldDefinition} from 'sanity'
import {SchemaBaseFields} from '../types'

/**
 * Configuration options for the Site Logo Block.
 *
 * @public
 */
export interface SiteLogoBlockConfig extends SchemaBaseFields {
  query: string
  customFields?: FieldDefinition[]
}
