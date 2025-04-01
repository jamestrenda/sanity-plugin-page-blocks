import {CheckCheckIcon, CheckIcon} from 'lucide-react'
import {describe, expect, it} from 'vitest'

import {isFieldHidden, mergeGroups} from './createSchema'

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
