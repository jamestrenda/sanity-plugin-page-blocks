import {defineField, FieldDefinition} from 'sanity'

import {CustomImageType} from '../../types'
import {getImageField} from './getImageField'

/**
 * Generates an image field configuration for a display image in Sanity schema.
 *
 * This function is specifically designed for images where captions are not required
 * (e.g., hero images, background images). It utilizes `getImageField` but excludes
 * the `caption` field.
 *
 * @param {Exclude<CustomImageType, false>} options - Configuration options for the display image field.
 *   - Additional `customFields` can be specified to extend the image schema.
 * @returns {ImageField} - The configured display image field with the `caption` field excluded.
 */
export function getDisplayImage(
  options: Omit<Exclude<CustomImageType, false>, 'caption'> = {},
): FieldDefinition {
  // Use getImageField and filter out the 'caption' field specifically for display images
  const imageFieldConfig = getImageField(options)

  // Filter out the 'caption' field for display images
  const filteredFields = imageFieldConfig.fields.filter((field) => field.name !== 'caption')

  return defineField({...imageFieldConfig, fields: filteredFields})
}
