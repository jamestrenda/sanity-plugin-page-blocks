import {FieldDefinition, TitledListValue} from 'sanity'

import {SchemaBaseFields} from '../types'

type ArticleListBlockFieldNames = 'articleType' | 'title' | 'articles'

/**
 * Configuration options for the Article List Block.
 *
 * @public
 */
export interface ArticleListBlockConfig extends SchemaBaseFields<ArticleListBlockFieldNames> {
  articleTypes: (string | Required<Pick<TitledListValue<string>, 'title' | 'value'>>)[]
  header?: FieldDefinition
}
