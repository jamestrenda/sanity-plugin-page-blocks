import {PortableTextBlock} from 'sanity'
import {describe, expect, it} from 'vitest'

import {
  filterValidBlocks,
  findTitleBlock,
  getBlockText,
  getPortableTextPreview,
} from './getPortableTextPreview'

let value: PortableTextBlock[] | undefined

const validBlockWithPrecedingEmptyBlocks: PortableTextBlock[] = [
  {
    _key: '6087c836e141',
    _type: 'block',
    children: [
      {
        _key: 'f30ec1baaa34',
        _type: 'span',
        marks: [],
        text: '',
      },
    ],
    style: 'normal',
    markDefs: [],
  },
  {
    _type: 'block',
    _key: '9f63aaaf88b0',
    children: [
      {
        _key: '338a086467f9',
        _type: 'span',
        text: '',
        marks: [],
      },
    ],
    markDefs: [],
    style: 'normal',
  },
  {
    _type: 'block',
    _key: 'c32bdef1c52a',
    children: [
      {
        _key: '6dc0661c68d0',
        _type: 'span',
        text: 'h5 heading with two empty text blocks preceding it',
        marks: [],
      },
    ],
    markDefs: [],
    style: 'h5',
  },
]

const invalidBlocks: PortableTextBlock[] = [
  {
    _key: '3853cf929f38',
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: 'image-d37910b8fb5dc1a95f58f47614842554961e04ee-1222x554-png',
    },
  },
]

const h1PreceededByLowerPriorityTextBlock: PortableTextBlock[] = [
  {
    _key: 'cc89f3c700c6',
    _type: 'block',
    children: [
      {
        _key: '99b9da59e21d',
        _type: 'span',
        marks: [],
        text: 'An overline',
      },
    ],
    markDefs: [],
    style: 'overline',
  },
  {
    _key: 'f55df0f1067c',
    _type: 'block',
    children: [
      {
        _key: '568c8efe4028',
        _type: 'span',
        marks: [],
        text: 'An h1 heading',
      },
    ],
    markDefs: [],
    style: 'h1',
  },
  {
    _key: '2b3fa15ec9f6',
    _type: 'block',
    children: [
      {
        _key: 'cd13f245c32c',
        _type: 'span',
        marks: [],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
    ],
    markDefs: [],
    style: 'normal',
  },
]

const normalPreceededByLowerPriorityTextBlock: PortableTextBlock[] = [
  {
    _key: 'cc89f3c700c6',
    _type: 'block',
    children: [
      {
        _key: '99b9da59e21d',
        _type: 'span',
        marks: [],
        text: 'Overline',
      },
    ],
    markDefs: [],
    style: 'overline',
  },
  {
    _key: '2b3fa15ec9f6',
    _type: 'block',
    children: [
      {
        _key: 'cd13f245c32c',
        _type: 'span',
        marks: [],
        text: 'A normal paragraph.',
      },
    ],
    markDefs: [],
    style: 'normal',
  },
]

const customBlockStyle: PortableTextBlock[] = [
  {
    _key: 'cc89f3c700c6',
    _type: 'block',
    children: [
      {
        _key: '99b9da59e21d',
        _type: 'span',
        marks: [],
        text: 'An unaccounted for text-based block style',
      },
    ],
    markDefs: [],
    style: 'overline',
  },
]

describe('getPortableTextPreview', () => {
  it('should return a valid preview config', () => {
    expect(getPortableTextPreview(value, 'Lorem')).toEqual({
      title: 'Lorem',
    })

    expect(getPortableTextPreview(h1PreceededByLowerPriorityTextBlock, 'Lorem Block')).toEqual({
      title: 'An h1 heading',
      subtitle: 'Lorem Block',
      media: undefined,
    })

    expect(getPortableTextPreview(normalPreceededByLowerPriorityTextBlock, 'Lorem Block')).toEqual({
      title: 'A normal paragraph.',
      subtitle: 'Lorem Block',
    })

    expect(getPortableTextPreview(customBlockStyle, 'Lorem Block')).toEqual({
      title: 'An unaccounted for text-based block style',
      subtitle: 'Lorem Block',
    })

    expect(getPortableTextPreview(invalidBlocks, 'Lorem Block')).toEqual({
      title: 'Lorem Block',
    })

    expect(getPortableTextPreview(validBlockWithPrecedingEmptyBlocks, 'Lorem Block')).toEqual({
      title: 'h5 heading with two empty text blocks preceding it',
      subtitle: 'Lorem Block',
    })
  })
})

describe('filterValidBlocks', () => {
  it('should have 1 element', () => {
    expect(filterValidBlocks(validBlockWithPrecedingEmptyBlocks)).toHaveLength(1)
  })
})

describe('findTitleBlock', () => {
  it('should return a block', () => {
    expect(findTitleBlock(filterValidBlocks(h1PreceededByLowerPriorityTextBlock))).toBeDefined()
  })
  it('should return undefined', () => {
    expect(findTitleBlock(filterValidBlocks(invalidBlocks))).toBeUndefined()
  })
})

describe('getBlockText', () => {
  it('should return a title', () => {
    const block = findTitleBlock(filterValidBlocks(customBlockStyle)) as PortableTextBlock
    expect(getBlockText(block)).toBe('An unaccounted for text-based block style')
  })
})
