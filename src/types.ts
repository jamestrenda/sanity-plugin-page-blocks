import {
  DocumentComponents,
  FieldDefinition,
  FieldGroupDefinition,
  FieldsetDefinition,
  PreviewConfig,
} from 'sanity'

type GroupAssignment<TFieldNames extends string> = {
  field: TFieldNames // Ensures type safety for field names
  group: string | string[] // Can be any string from user-defined groups
}

type FieldsetAssignment<TFieldNames extends string> = {
  field: TFieldNames
  fieldset: string
}

export interface SchemaBaseFields<TFieldNames extends string> {
  name?: string
  fieldsets?: Array<FieldsetDefinition>
  fieldsetAssignments?: Array<FieldsetAssignment<TFieldNames>>
  groups?: Array<FieldGroupDefinition>
  groupAssignments?: Array<GroupAssignment<TFieldNames>>
  preview?: PreviewConfig
  customFields?: Array<FieldDefinition>
  customComponents?: DocumentComponents
}
