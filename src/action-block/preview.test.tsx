import {ObjectDefinition, SchemaTypeDefinition} from 'sanity'
import {describe, expect, it} from 'vitest'

import {actionBlock} from '.'

describe('actionBlock preview', () => {
  const plugin = actionBlock()
  const types = plugin?.schema?.types as SchemaTypeDefinition[]
  const schema = types[0] as ObjectDefinition
  const preview = schema?.preview
  const prepareFn = preview?.prepare

  const previewSnapshot = {
    title: 'Action',
    media: expect.any(Function),
  }

  it('should display just the block name by default', () => {
    const data = {}

    const result = prepareFn?.(data)

    expect(result).toMatchObject({
      title: previewSnapshot.title,
      media: previewSnapshot.media,
    })
  })
})
