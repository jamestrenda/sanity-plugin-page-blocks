import {isPortableTextTextBlock, PortableTextBlock} from 'sanity'

/**
 * Generates a preview title from a Portable Text value.
 *
 * @param value - An array of Portable Text blocks.
 * @param blockTitle - A fallback title if no valid text block is found.
 * @returns An object containing `title` and optionally `subtitle`.
 *
 * @public
 */
export function getPortableTextPreview(
  value: PortableTextBlock[] | undefined,
  blockTitle: string,
): {
  title: string
  subtitle?: string
} {
  if (!value) {
    return {title: blockTitle}
  }

  const filteredValue = filterValidBlocks(value)
  const textBlock = findTitleBlock(filteredValue)

  const title = textBlock ? getBlockText(textBlock) : blockTitle

  return {
    title,
    subtitle: title === blockTitle ? undefined : blockTitle,
  }
}

/**
 * Filters out invalid blocks, specifically "normal" styled blocks
 * that contain only empty text.
 *
 * @param blocks - An array of Portable Text blocks.
 * @returns A filtered array without empty "normal" blocks.
 */
export function filterValidBlocks(blocks: PortableTextBlock[]): PortableTextBlock[] {
  return Array.isArray(blocks)
    ? blocks.filter(
        (block) =>
          block._type !== 'block' ||
          block.style !== 'normal' ||
          (isPortableTextTextBlock(block) &&
            block.children.some((child) => String(child.text).trim() !== '')),
      )
    : []
}

/**
 * Finds the first valid block that can be used as a title.
 * Prioritizes blocks with styles 'h1', 'h2', 'h3'.
 * If none are found, it checks if the first block is a valid text block.
 * If not, it falls back to the first valid "normal" block.
 *
 * @param blocks - A filtered array of Portable Text blocks.
 * @returns The first valid block or `undefined` if none found.
 */
export function findTitleBlock(blocks: PortableTextBlock[]): PortableTextBlock | undefined {
  return (
    blocks.find(
      (block) => block._type === 'block' && ['h1', 'h2', 'h3'].includes(String(block.style)),
    ) ||
    (isPortableTextTextBlock(blocks[0])
      ? blocks[0]
      : blocks.find(
          (block) => block._type === 'block' && ['normal'].includes(String(block.style)),
        ) || undefined)
  )
}

/**
 * Extracts and joins the text content of a Portable Text block.
 *
 * @param block - A Portable Text block.
 * @returns The concatenated text content of the block.
 */
export function getBlockText(block: PortableTextBlock): string {
  return isPortableTextTextBlock(block) ? block.children.map((child) => child.text).join('') : ''
}
