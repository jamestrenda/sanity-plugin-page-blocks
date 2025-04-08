import {describe, expect, it} from 'vitest'
import {callToActionBlock} from '.'
import {ObjectDefinition, SchemaTypeDefinition} from 'sanity'

describe('callToActionBlock preview', () => {
  const plugin = callToActionBlock()
  const types = plugin?.schema?.types as SchemaTypeDefinition[]
  const schema = types[0] as ObjectDefinition
  const preview = schema?.preview
  const prepareFn = preview?.prepare

  const previewSnapshot = {
    title: 'My Custom CTA',
    subtitle: 'Call to Action',
  }

  it('should display just the block name by default', () => {
    const data = {}

    const result = prepareFn?.(data)

    expect(result).toMatchObject({
      title: previewSnapshot.subtitle,
    })
  })

  it('it should always display the title if it has a value', () => {
    const title = {
      title: 'My Custom CTA',
    }

    const titleResult = prepareFn?.(title)
    expect(titleResult).toMatchObject(previewSnapshot)

    const titleAndText = {
      title: title.title,
      text: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              text: 'Lorem ipsum',
            },
          ],
        },
      ],
    }

    const titleAndTextResult = prepareFn?.(titleAndText)
    expect(titleAndTextResult).toMatchObject(previewSnapshot)

    const titleTextImage = {
      _key: '34feb3b1a9ad',
      _type: 'callToActionBlock',
      title: title.title,
      text: titleAndText.text,
      customImage: {
        file: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-abcdedfg-jpg',
          },
        },
      },
    }

    const titleTextImageResult = prepareFn?.(titleTextImage)
    expect(titleTextImageResult).toMatchObject(previewSnapshot)

    const everything = {
      _key: '34feb3b1a9ad',
      _type: 'callToActionBlock',
      title: title.title,
      text: titleAndText.text,
      customImage: titleTextImage.customImage,
      actions: [
        {
          _key: '0eac9cbee924',
          _type: 'action',
          action: {
            to: [
              {
                _key: 'fb0c5d9b85a1',
                _type: 'external',
                link: {
                  newWindow: true,
                },
              },
            ],
          },
        },
      ],
    }

    const everythingResult = prepareFn?.(everything)
    expect(everythingResult).toMatchObject(previewSnapshot)
  })

  it('should display the first heading text available when there is no title', () => {
    const hasHeading = {
      text: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              text: 'Lorem ipsum',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h2',
          children: [
            {
              text: 'H2 - Lorem ipsum',
            },
          ],
        },
      ],
    }
    const hasHeadingResult = prepareFn?.(hasHeading)

    expect(hasHeadingResult).toMatchObject({
      title: 'H2 - Lorem ipsum',
      subtitle: previewSnapshot.subtitle,
    })

    const hasNoHeading = {
      text: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              text: 'Lorem ipsum',
            },
          ],
        },
      ],
    }
    const hasNoHeadingResult = prepareFn?.(hasNoHeading)

    expect(hasNoHeadingResult).toMatchObject({
      title: 'Lorem ipsum',
      subtitle: previewSnapshot.subtitle,
    })

    const hasNoTextOrHeading = {
      text: [
        {
          _key: '6e19a9a6e01a',
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-abcdefg-jpg',
          },
        },
      ],
    }
    const hasNoTextOrHeadingResult = prepareFn?.(hasNoTextOrHeading)

    expect(hasNoTextOrHeadingResult).toMatchObject({
      title: previewSnapshot.subtitle,
    })
  })

  it('prepares preview correctly when there is no title or text value', () => {
    const data = {}
    const result = prepareFn?.(data)

    expect(result).toMatchObject({
      title: 'Call to Action',
    })
  })
})
