import {describe, expect, it} from 'vitest'
import {callToActionBlock} from '.'
import {ObjectDefinition, SchemaTypeDefinition} from 'sanity'

describe('callToActionBlock preview', () => {
  const plugin = callToActionBlock()
  const types = plugin?.schema?.types as SchemaTypeDefinition[]
  const schema = types[0] as ObjectDefinition
  const preview = schema?.preview
  const prepareFn = preview?.prepare

  it('prepares default preview correctly', () => {
    const data = {}
    const result = prepareFn?.(data)

    expect(result).toMatchObject({
      title: 'Call to Action',
    })
  })

  it('prepares preview correctly when title has a value', () => {
    const data = {
      title: 'My Custom CTA',
      text: [
        {
          _type: 'block',
          _key: '07175b136c20',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: '7b173b74894b',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              marks: [],
            },
          ],
        },
      ],
    }

    const result = prepareFn?.(data)

    expect(result).toMatchObject({
      title: 'My Custom CTA',
      subtitle: 'Call to Action',
    })
  })

  it('prepares preview correctly when text has a value and title does not', () => {
    const data = {
      text: [
        {
          _type: 'block',
          _key: '07175b136c20',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: '7b173b74894b',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              marks: [],
            },
          ],
        },
      ],
    }
    const result = prepareFn?.(data)

    expect(result).toMatchObject({
      title:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      subtitle: 'Call to Action',
    })
  })
})
