import {
  DocumentComponents,
  FieldDefinition,
  FieldGroupDefinition,
  FieldsetDefinition,
  PreviewConfig,
} from 'sanity'

export interface SchemaBaseFields {
  name?: string
  fieldsets?: Array<FieldsetDefinition>
  groups?: Array<FieldGroupDefinition>
  preview?: PreviewConfig
  customFields?: Array<FieldDefinition>
  components?: DocumentComponents
}

export interface SchemaFieldBaseFields {
  fieldset?: FieldDefinition['fieldset']
  group?: FieldDefinition['group']
}
