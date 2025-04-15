import {ObjectDefinition, SchemaTypeDefinition} from 'sanity'
import {describe, expect, it} from 'vitest'

import {sanitizeSchema} from '../tests/lib/utils'
import {actionBlock} from '.'

describe('action-block', () => {
  it('should generate default schema', () => {
    const plugin = actionBlock() // or pass config here
    const types = plugin?.schema?.types as SchemaTypeDefinition[]
    const schema = types[0] as ObjectDefinition
    expect(sanitizeSchema(schema)).toMatchSnapshot('Default action schema')
  })

  describe('metadata', () => {
    const plugin = actionBlock()
    const types = plugin?.schema?.types as SchemaTypeDefinition[]
    const schema = types[0] as ObjectDefinition

    it('should have the correct name', () => {
      const schemaName = schema.name

      expect(schemaName).toEqual('actionBlock')
    })

    it('should have the correct title', () => {
      const schemaTitle = schema.title

      expect(schemaTitle).toEqual('Action')
    })
  })
})
