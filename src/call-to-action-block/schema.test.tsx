import {ObjectDefinition, SchemaTypeDefinition} from 'sanity'
import {describe, expect, it} from 'vitest'
import {callToActionBlock} from '.'
import {sanitizeSchema} from '../tests/lib/utils'

it('call-to-action-block generates default schema', () => {
  const plugin = callToActionBlock() // or pass config here
  const types = plugin?.schema?.types as SchemaTypeDefinition[]
  const schema = types[0] as ObjectDefinition
  expect(sanitizeSchema(schema)).toMatchSnapshot('Default callToAction schema')
})

it('call-to-action-block generates default schema without title field when title set to false', () => {
  const plugin = callToActionBlock({
    title: false,
  }) // or pass config here
  const types = plugin?.schema?.types as SchemaTypeDefinition[]
  const schema = types[0] as ObjectDefinition
  expect(sanitizeSchema(schema)).toMatchSnapshot('callToAction schema without title')
})

it('call-to-action-block generates default schema without text field when text set to false', () => {
  const plugin = callToActionBlock({
    text: false,
  }) // or pass config here
  const types = plugin?.schema?.types as SchemaTypeDefinition[]
  const schema = types[0] as ObjectDefinition
  expect(sanitizeSchema(schema)).toMatchSnapshot('callToAction schema without text')
})

describe('call-to-action-block metadata', () => {
  const plugin = callToActionBlock()
  const types = plugin?.schema?.types as SchemaTypeDefinition[]
  const schema = types[0] as ObjectDefinition

  it('have the correct name', () => {
    const schemaName = schema.name

    expect(schemaName).toEqual('callToActionBlock')
  })

  it('should have the correct title', () => {
    const schemaTitle = schema.title

    expect(schemaTitle).toEqual('Call to Action')
  })
})
