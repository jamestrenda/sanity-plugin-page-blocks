import {defineField, FieldDefinition} from 'sanity'

import {SchemaFieldBaseFields} from '../../types'
import {customImage} from '../objects/image'
import {createFieldConfig} from '../utils/createSchema'

export const imageField = (fields?: FieldDefinition[], config?: SchemaFieldBaseFields) =>
  defineField({
    ...customImage(fields),
    ...createFieldConfig(config),
  })
