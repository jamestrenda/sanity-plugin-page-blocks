import {
  ArrayOfObjectsComponents,
  ArrayOfPrimitivesComponents,
  ArrayOfType,
  ArrayRule,
  BlockListDefinition,
  BlockMarksDefinition,
  BlockStyleDefinition,
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

export type StringFieldType =
  | false
  | ({
      components?: StringComponents | undefined
    } & SchemaFieldBaseFields &
      StringFieldValidationType)

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
  | ({type: 'string'; components?: StringComponents} & SchemaFieldBaseFields)
  | ({
      type?: undefined
      styles?: BlockStyleDefinition[]
      lists?: BlockListDefinition[]
      decorators?: BlockMarksDefinition['decorators']
      annotations?: BlockMarksDefinition['annotations']
      blocks?: ArrayOfType[]
      components?: ArrayOfPrimitivesComponents | ArrayOfObjectsComponents
      validation?: ValidationBuilder<ArrayRule<unknown[]>, unknown[]> | undefined
    } & SchemaFieldBaseFields)

export type ActionsType = {
  internal?: {
    types: ReferenceTo
  }
  validation?: ValidationBuilder<ArrayRule<unknown[]>, unknown[]> | undefined
  customFields?: FieldDefinition[]
}

export type BlockSchema = ReturnType<typeof createSchema>
