import {CheckCheckIcon, CheckIcon} from 'lucide-react'
import {defineField, FieldDefinition, PreviewConfig} from 'sanity'
import {describe, expect, it} from 'vitest'

import {
  createFieldConfig,
  createSchema,
  getVisibleFields,
  isFieldHidden,
  mergeGroups,
} from './createSchema'

describe('mergeGroups', () => {
  it('should merge groups with the same name, ensuring defaults are respected while allowing user overrides.', () => {
    expect(
      mergeGroups(
        [
          // default groups...
          {
            name: 'main-content',
            title: 'Content',
            icon: CheckIcon,
            default: false,
          },
        ],
        [
          // user groups...
          {
            name: 'main-content',
            title: 'Content',
            icon: CheckCheckIcon, // should override default
            default: true, // should override default
          },
          {
            name: 'test',
            title: 'Test',
          },
        ],
      ),
    ).toEqual([
      {
        name: 'main-content',
        title: 'Content',
        icon: CheckCheckIcon,
        default: true,
      },
      {
        name: 'test',
        title: 'Test',
      },
    ])
  })
})

describe('isFieldHidden', () => {
  it('should be false when given any value but false', () => {
    let title
    expect(isFieldHidden(undefined)).toBe(false)

    title = {
      fieldset: {
        name: 'content',
        title: 'Content',
      },
      group: 'content',
    }
    expect(isFieldHidden(title)).toBe(false)

    title = false
    expect(isFieldHidden(title)).toBe(true)

    title = true
    expect(isFieldHidden(title)).toBe(false)
  })
})

describe('getVisibleFields', () => {
  const fields = [{name: 'text'}, {name: 'image'}, {name: 'actions'}] as FieldDefinition[]

  it('filters out fields explicitly set to false in config', () => {
    const config = {
      actions: false,
    }

    const result = getVisibleFields(fields, config)
    expect(result).toEqual([
      {
        name: 'text',
      },
      {
        name: 'image',
      },
    ])
  })

  it('filters out multiple fields if set to false', () => {
    const options = {
      actions: false,
      image: false,
    }

    const result = getVisibleFields(fields, options)
    expect(result).toEqual([{name: 'text'}])
  })

  it('returns all fields if options is empty', () => {
    const result = getVisibleFields(fields, {})
    expect(result).toEqual(fields)
  })

  it('returns all fields if options is undefined', () => {
    // @ts-expect-error testing undefined options
    const result = getVisibleFields(fields, undefined)
    expect(result).toEqual(fields)
  })

  // it shouldn't recieve null or undefined values
  it('ignores options with undefined or null values', () => {
    const options = {
      text: undefined,
      image: null,
      actions: {},
    }

    const result = getVisibleFields(fields, options)
    expect(result).toEqual(fields)
  })
})

const DummyIcon = () => <span>⬛️</span>

describe('createSchema', () => {
  const options = {
    customFields: undefined,
    components: undefined,
    fieldset: undefined,
    group: undefined,
  }

  it('returns a valid Sanity schema object with minimal inputs', () => {
    const schema = createSchema({
      name: 'block',
      title: 'Block',
      icon: DummyIcon,
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          ...createFieldConfig(options),
        }),
      ],
      ...(options.customFields ?? []),
      options: {},
    })

    expect(schema).toMatchObject({
      name: 'block',
      title: 'Block',
      type: 'object',
      fields: [{name: 'title', type: 'string'}],
      icon: DummyIcon,
    })
  })

  it('respects overrides from options', () => {
    const blockTitle = 'Test Block'
    const preview: PreviewConfig = {
      select: {
        title: 'title',
      },
      prepare({title}) {
        return {
          title: title || blockTitle,
          subtitle: title ? blockTitle : undefined,
          media: DummyIcon,
        }
      },
    }

    const schema = createSchema({
      name: 'block',
      title: blockTitle,
      icon: DummyIcon,
      fields: [{name: 'title', type: 'string', ...createFieldConfig({})}],
      options: {
        name: 'customBlockName',
        preview,
        components: {input: () => 'CustomInput'},
        groups: [{name: 'main', title: 'Main'}],
        fieldsets: [{name: 'meta', title: 'Metadata'}],
      },
    })

    expect(schema.name).toBe('customBlockName')
    expect(schema.preview).toEqual(preview)
    expect(schema.components).toEqual({input: expect.any(Function)})
    expect(schema.groups).toHaveLength(1)
    expect(schema.fieldsets).toHaveLength(1)
  })

  it('filters out fields hidden via options', () => {
    const schema = createSchema({
      name: 'hiddenTest',
      title: 'Hidden Fields',
      icon: DummyIcon,
      fields: [
        {name: 'a', type: 'string'},
        {name: 'b', type: 'string'},
      ],
      options: {
        a: false,
        b: {},
      },
    })

    const fieldNames = schema.fields.map((f) => f.name)
    expect(fieldNames).toEqual(['b']) // "a" should be filtered out
  })

  it('sets fallback defaults when options are not passed', () => {
    const schema = createSchema({
      name: 'noOptions',
      title: 'No Options',
      icon: DummyIcon,
      fields: [{name: 'one', type: 'string'}],
    })

    expect(schema.name).toEqual('noOptions') // from options.name
    expect(schema.groups).toEqual([]) // from mergeGroups([], undefined)
    expect(schema.fieldsets).toEqual([]) // default to empty
    expect(schema.preview).toBeUndefined()
  })
})
