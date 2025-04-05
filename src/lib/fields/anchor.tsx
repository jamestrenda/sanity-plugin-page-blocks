import React from 'react'
import {defineField} from 'sanity'

import {Description} from '../components/Description'

export const anchorField = defineField({
  name: 'anchor',
  title: 'Anchor',
  type: 'string',
  description: (
    <Description>
      A unique identifier for the element. See{' '}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#linking_to_an_element_on_the_same_page"
        target="_blank"
        rel="noreferrer"
      >
        Linking to an element on the same page
      </a>{' '}
      for more info.
    </Description>
  ),
  validation: (Rule) =>
    Rule.custom((anchor) => {
      // validate the anchor against the HTML5 spec
      if (anchor && !/^[a-z][a-z0-9:_-]*$/.test(anchor)) {
        return 'Anchor must be a valid HTML5 id (lowercase letters, numbers, colons, underscores, and hyphens) and start with a letter.'
      }

      return true
    }),
})
