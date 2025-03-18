import {
  DocumentComponents,
  FieldDefinition,
  FieldGroupDefinition,
  FieldsetDefinition,
  PreviewConfig,
  TitledListValue,
} from 'sanity'

type ArticleListBlockFieldNames = 'articleType' | 'title' | 'categories'

// Allows assigning default fields to user-defined groups
type GroupAssignment = {
  field: ArticleListBlockFieldNames // Type-checked against existing fields
  group: string | string[] // Can be any string from user-defined groups
}

type FieldsetAssignment = {
  field: ArticleListBlockFieldNames
  fieldset: string
}

interface SchemaBaseFields {
  name?: string
  fieldsets?: Array<FieldsetDefinition>
  fieldsetAssignments?: Array<FieldsetAssignment>
  groups?: Array<FieldGroupDefinition>
  groupAssignments?: Array<GroupAssignment>
  preview?: PreviewConfig
  customFields?: Array<FieldDefinition>
  customComponents?: DocumentComponents
}

/**
 * Configuration options for the Article List Block.
 *
 * @public
 */
export interface ArticleListBlockConfig extends SchemaBaseFields {
  articleTypes?: (string | TitledListValue<string>)[] | undefined
  header?: FieldDefinition
  categoryField?: FieldDefinition
  maxArticles?: number
}
