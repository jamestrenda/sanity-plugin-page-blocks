import {Plugin, SchemaTypeDefinition} from 'sanity'
import {describe, expect, it} from 'vitest'

import * as Blocks from '../index'
import {isSanitySchema} from '../lib/utils/isSanitySchema'

// helper to extract all schemas from the plugin exports
// Define config overrides here for blocks that require them
const pluginTestConfigs: Record<string, unknown> = {
  containerBlock: {
    content: {
      of: [
        {
          type: 'textBlock',
        },
      ],
    },
  },
  carouselBlock: {
    items: {
      of: [
        {
          type: 'heroBlock',
        },
      ],
    },
  },
}

export function getAllSchemas() {
  return Object.entries(Blocks).flatMap(([key, pluginFactory]) => {
    const config = pluginTestConfigs[key] ?? {}
    const plugin = (pluginFactory as Plugin<unknown>)(config)

    const types = (plugin?.schema?.types as SchemaTypeDefinition[]) ?? []
    return types.map((schema) => ({
      key,
      schema,
    }))
  })
}
describe('Sanity Page Block Schemas', () => {
  const allSchemas = getAllSchemas()

  // 1. Check all schemas conform to BlockSchema
  it.each(allSchemas)('%s exports a valid schema', ({schema}) => {
    expect(isSanitySchema(schema)).toBe(true)
  })

  // 2. Check for duplicate schema names
  it('does not contain duplicate schema names', () => {
    const nameCounts = new Map<string, number>()

    for (const {schema} of allSchemas) {
      if (isSanitySchema(schema)) {
        nameCounts.set(schema.name, (nameCounts.get(schema.name) ?? 0) + 1)
      }
    }

    const duplicates = [...nameCounts.entries()].filter(([, count]) => count > 1)
    expect(duplicates).toEqual([])
  })

  // 3. Check required fields exist on each schema
  it.each(allSchemas)('%s schema has required props', ({schema}) => {
    if (!isSanitySchema(schema)) {
      throw new Error(`Invalid schema shape: ${JSON.stringify(schema, null, 2)}`)
    }

    expect(typeof schema.name).toBe('string')
    expect(schema.type).toBe('object')
    expect(Array.isArray(schema.fields)).toBe(true)
  })

  it.each(allSchemas)('%s schema matches snapshot', ({schema}) => {
    expect(schema).toMatchSnapshot()
  })
})
