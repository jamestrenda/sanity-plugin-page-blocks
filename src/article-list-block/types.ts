import {FieldDefinition, TitledListValue} from 'sanity'

import {SchemaBaseFields} from '../types'

type ArticleListBlockFieldNames = 'articleType' | 'title' | 'categories'

interface Config extends SchemaBaseFields<ArticleListBlockFieldNames> {
  articleTypes?: (string | TitledListValue<string>)[] | undefined
  header?: FieldDefinition
  categoryField?: FieldDefinition
  maxArticles?: number
}

/**
 * Configuration options for the Article List Block.
 *
 * @public
 */
export type ArticleListBlockConfig = Config | void
