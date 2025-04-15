import {ObjectDefinition, SchemaTypeDefinition} from 'sanity'
import {describe, expect, it} from 'vitest'

import {sanitizeSchema} from '../tests/lib/utils'
import {containerBlock} from '.'

describe('container-block', () => {
  it('should generate default schema', () => {
    const plugin = containerBlock({
      blocks: {
        of: [],
      },
    })
    const types = plugin?.schema?.types as SchemaTypeDefinition[]
    const schema = types[0] as ObjectDefinition
    expect(sanitizeSchema(schema)).toMatchSnapshot('Default containerBlock schema')
  })
})
