import {
  ArrayRule,
  BlockDefinition,
  DocumentComponents,
  FieldDefinition,
  FieldGroupDefinition,
  FieldsetDefinition,
  ImageRule,
  ImageValue,
  ObjectRule,
  PreviewConfig,
  ReferenceTo,
  StringComponents,
  StringRule,
  ValidationBuilder,
} from 'sanity'

import {createSchema} from './lib/utils/createSchema'

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

export type StringFieldValidationType = ValidationBuilder<StringRule, string> | undefined

export type StringFieldType = {
  type: 'string'
  components?: StringComponents | undefined
  validation?: StringFieldValidationType
} & SchemaFieldBaseFields

export type CustomImageType =
  | false
  | (SchemaFieldBaseFields & {
      customFields?: FieldDefinition[]
      validation?: ValidationBuilder<ObjectRule, Record<string, unknown>> | undefined
    } & {
      file?: {
        validation?: ValidationBuilder<ImageRule, ImageValue> | undefined
      }
      altText?: {
        validation?: StringFieldValidationType
      }
      caption?: {
        validation?: StringFieldValidationType
      }
    })

export type TextType =
  | false
  | StringFieldType
  | ({
      type?: undefined
      validation?: ValidationBuilder<ArrayRule<unknown[]>, unknown[]> | undefined
    } & Omit<BlockDefinition, 'type' | 'name' | 'validation'> &
      SchemaFieldBaseFields)

export type ActionType = {
  internal?: {
    types: ReferenceTo
  }
  customFields?: FieldDefinition[]
}

export type ActionsType = ActionType & {
  validation?: ValidationBuilder<ArrayRule<unknown[]>, unknown[]> | undefined
}

export type BlockSchema = ReturnType<typeof createSchema>
