import {ObjectDefinition} from 'sanity'

import {CustomImageType} from '../../types'
import {imageField} from '../fields/imageField'
import {imageFields} from '../fields/imageFields'

/**
 * Generates an image field configuration for Sanity schema.
 *
 * This function constructs an image field based on the provided options, allowing customization
 * through additional fields. Since `false` is excluded from `options`, a valid object must be provided.
 *
 * @param {Exclude<CustomImageType, false>} options - Configuration options for the image field.
 *   - Additional `customFields` can be specified to extend the image schema.
 * @returns {ObjectDefinition} - The configured image field.
 */
export function getImageField(options: Exclude<CustomImageType, false>): ObjectDefinition {
  if (!options) {
    return imageField([], options)
  }
  return imageField([...imageFields(options), ...(options?.customFields ?? [])], options)
}
