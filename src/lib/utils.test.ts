import {describe, expect, it} from 'vitest'

import {isFieldHidden} from './utils'

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
  })
})
