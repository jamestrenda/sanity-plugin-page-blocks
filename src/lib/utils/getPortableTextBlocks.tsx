import {
  type BlockListDefinition,
  type BlockMarksDefinition,
  type BlockStyleDefinition,
  defineArrayMember,
} from 'sanity'

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

export function getPortableTextBlocks(options?: {
  styles?: BlockStyleDefinition[]
  lists?: BlockListDefinition[]
  decorators?: BlockMarksDefinition['decorators'][][number]
  annotations?: BlockMarksDefinition['annotations']
}) {
  if (!options) {
    return [portableTextBlocks]
  }
  const {styles, lists, decorators, annotations} = options

  const mergedStyles = styles
    ? [
        ...(portableTextBlocks.styles?.filter((style) =>
          styles.some((s) => s.value === style.value),
        ) ?? []),
        ...styles.filter(
          (defaultStyle) =>
            !portableTextBlocks.styles?.some((style) => style.value === defaultStyle.value),
        ),
      ]
    : portableTextBlocks.styles

  const result = [
    defineArrayMember({
      ...portableTextBlocks,
      styles: mergedStyles,
      lists: lists
        ? portableTextBlocks.lists?.filter((list) => lists?.some((l) => l.value === list.value))
        : portableTextBlocks.lists,
      marks: {
        decorators: decorators
          ? portableTextBlocks.marks?.decorators?.filter((decorator) =>
              decorators?.some((d) => d.value === decorator.value),
            )
          : portableTextBlocks.marks?.decorators,
        annotations: annotations ?? portableTextBlocks.marks?.annotations,
      },
    }),
  ]

  return result
}
