import {defineField, FieldDefinition} from 'sanity'

import {CustomImageType} from '../../types'
import {customImage} from '../objects/image'

export const imageField = (fields?: FieldDefinition[], config?: Exclude<CustomImageType, false>) =>
  defineField({
    ...customImage(fields, config),
  })
