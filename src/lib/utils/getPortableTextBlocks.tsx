import {BlockDefinition, defineArrayMember} from 'sanity'

export const portableTextBlocks = defineArrayMember({
  type: 'block',
  styles: [
    {title: 'Normal', value: 'normal'},
    {title: 'Heading 1', value: 'h1'},
    {title: 'Heading 2', value: 'h2'},
    {title: 'Heading 3', value: 'h3'},
    {title: 'Heading 4', value: 'h4'},
    {title: 'Heading 5', value: 'h5'},
    {title: 'Heading 6', value: 'h6'},
    {title: 'Quote', value: 'blockquote'},
  ],
  lists: [
    {title: 'Bullet', value: 'bullet'},
    {title: 'Number', value: 'number'},
  ],
  // Marks let you mark up inline text in the block editor.
  marks: {
    // Decorators usually describe a single property - e.g. a typographic
    // preference or highlighting by editors.
    decorators: [
      {title: 'Strong', value: 'strong'},
      {title: 'Emphasis', value: 'em'},
      {title: 'Underline', value: 'underline'},
      {title: 'Strike', value: 'strike-through'},
      {title: 'Code', value: 'code'},
    ],
    // Annotations can be any object structure - e.g. a link or a footnote.
    // annotations: [],
  },
})

export function getPortableTextBlocks(options?: Omit<BlockDefinition, 'type' | 'name'>) {
  if (!options) {
    return [portableTextBlocks]
  }
  const {styles, lists, marks} = options

  const result = [
    defineArrayMember({
      ...portableTextBlocks,
      styles: styles ?? portableTextBlocks.styles,
      lists: lists
        ? portableTextBlocks.lists?.filter((list) => lists?.some((l) => l.value === list.value))
        : portableTextBlocks.lists,
      marks: {
        decorators: marks?.decorators
          ? portableTextBlocks.marks?.decorators?.filter((decorator) =>
              marks?.decorators?.some((d) => d.value === decorator.value),
            )
          : portableTextBlocks.marks?.decorators,
        annotations: marks?.annotations ?? portableTextBlocks.marks?.annotations,
      },
    }),
  ]

  return result
}
