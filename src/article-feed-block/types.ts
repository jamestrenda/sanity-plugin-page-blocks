import {FieldDefinition, TitledListValue} from 'sanity'

import {SchemaBaseFields} from '../types'

type ArticleFeedBlockFieldNames = 'articleType' | 'title' | 'categories'

interface Config extends SchemaBaseFields<ArticleFeedBlockFieldNames> {
  articleTypes?: (string | TitledListValue<string>)[] | undefined
  header?: FieldDefinition
  categoryField?: FieldDefinition
}

/**
 * Configuration options for the Article Feed Block.
 *
 * @public
 */
export type ArticleFeedBlockConfig = Config | void
