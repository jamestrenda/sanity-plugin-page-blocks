import {ObjectDefinition, SchemaTypeDefinition} from 'sanity'
import {describe, expect, it} from 'vitest'
import {callToActionBlock} from '.'
import {sanitizeSchema} from '../tests/lib/utils'

describe('call-to-action-block', () => {
  it('should generate default schema', () => {
    const plugin = callToActionBlock() // or pass config here
    const types = plugin?.schema?.types as SchemaTypeDefinition[]
    const schema = types[0] as ObjectDefinition
    expect(sanitizeSchema(schema)).toMatchSnapshot('Default callToAction schema')
  })

  it('should correctly remove title field when title is false', () => {
    const plugin = callToActionBlock({
      title: false,
    }) // or pass config here
    const types = plugin?.schema?.types as SchemaTypeDefinition[]
    const schema = types[0] as ObjectDefinition
    expect(sanitizeSchema(schema)).toMatchSnapshot('callToAction schema without title')
  })

  it('should correctly remove text field when text is false', () => {
    const plugin = callToActionBlock({
      text: false,
    }) // or pass config here
    const types = plugin?.schema?.types as SchemaTypeDefinition[]
    const schema = types[0] as ObjectDefinition
    expect(sanitizeSchema(schema)).toMatchSnapshot('callToAction schema without text')
  })

  it('should not allow actions field to be removed', () => {
    const plugin = callToActionBlock({
      text: false,
    }) // or pass config here
    const types = plugin?.schema?.types as SchemaTypeDefinition[]
    const schema = types[0] as ObjectDefinition
    expect(sanitizeSchema(schema)).toMatchSnapshot('callToAction schema without text')
  })

  it('should throw if actions is set to false', () => {
    expect(() => {
      callToActionBlock({
        // @ts-expect-error testing invalid config
        actions: false,
      })
    }).toThrowError("callToActionBlock: 'actions: false' is not a supported configuration option.")
  })

  describe('metadata', () => {
    const plugin = callToActionBlock()
    const types = plugin?.schema?.types as SchemaTypeDefinition[]
    const schema = types[0] as ObjectDefinition

    it('should have the correct name', () => {
      const schemaName = schema.name

      expect(schemaName).toEqual('callToActionBlock')
    })

    it('should have the correct title', () => {
      const schemaTitle = schema.title

      expect(schemaTitle).toEqual('Call to Action')
    })
  })
})
