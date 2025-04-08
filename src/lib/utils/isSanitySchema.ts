import {BlockSchema} from '../../types'

export function isSanitySchema(obj: unknown): obj is BlockSchema {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    'type' in obj &&
    'fields' in obj &&
    typeof (obj as BlockSchema).name === 'string' &&
    typeof (obj as BlockSchema).type === 'string' &&
    Array.isArray((obj as BlockSchema).fields)
  )
}
