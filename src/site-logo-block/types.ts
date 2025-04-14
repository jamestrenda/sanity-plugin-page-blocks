import {FieldDefinition} from 'sanity'

import {SchemaBaseFields} from '../types'

interface Config extends SchemaBaseFields {
  query?: string
  params?: Record<string, unknown>
  customFields?: FieldDefinition[]
}

/**
 * The type of the Site Logo Block.
 *
 * @public
 */
export type SiteLogoBlockConfig = Config | void
