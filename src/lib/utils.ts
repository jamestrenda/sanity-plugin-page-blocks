import {PortableTextBlock, PortableTextTextBlock} from 'sanity'

/**
 * Merges user-defined field groups with default field groups.
 *
 * If a user-defined group has the same `name` as a default group, the properties of the default group
 * will be overwritten by the user-defined group while keeping any properties not explicitly provided by the user.
 * Any additional user-defined groups that do not exist in the default groups will be appended to the result.
 *
 * @template T - The shape of the group object, which must include a `name` property.
 * @param {T[]} defaultGroups - The default field groups provided by the plugin.
 * @param {Partial<T>[]} [userGroups] - Optional user-defined field groups that override or extend the defaults.
 * @returns {T[]} - The merged array of field groups, ensuring defaults are respected while allowing user overrides.
 *
 * @example
 * const defaultGroups = [
 *   { name: 'main', title: 'Content', default: true }
 * ];
 *
 * const userGroups = [
 *   { name: 'main', icon: ComposeIcon, default: false }
 * ];
 *
 * const merged = mergeGroups(defaultGroups, userGroups);
 * console.log(merged);
 * // Output:
 * // [
 * //   { name: 'main', title: 'Content', default: false, icon: ComposeIcon }
 * // ]
 */
export function mergeGroups<T extends {name: string}>(
  defaultGroups: T[],
  userGroups?: Partial<T>[],
): T[] {
  return [
    ...defaultGroups.map((defaultGroup) => {
      const userGroup = userGroups?.find((group) => group.name === defaultGroup.name)
      return userGroup ? ({...defaultGroup, ...userGroup} as T) : defaultGroup
    }),
    ...((userGroups?.filter(
      (group) => !defaultGroups.some((defaultGroup) => defaultGroup.name === group.name),
    ) as T[]) ?? []),
  ]
}

export function getPortableTextPreview(
  value: PortableTextBlock[],
  title: string,
): {
  title: string
  subtitle?: string
} {
  if (!value) {
    return {
      title,
    }
  }

  // find the first default block style that is a heading or paragraph
  let text = value.find(
    (block) =>
      block._type === 'block' && ['h1', 'h2', 'h3', 'normal'].includes(block.style as string),
  ) as PortableTextTextBlock

  // if no appropriate heading is detected, use the first block—whatever it may be
  if (!text) {
    text = value[0] as PortableTextTextBlock
  }

  // concat the block of text because it could be broken up into multiple children depending on its marks
  const textSnippet = text?.children.map((child) => child.text).join('')
  const hasTextSnippet = textSnippet.length > 0

  return {
    title: hasTextSnippet ? textSnippet : title,
    subtitle: hasTextSnippet ? title : undefined,
  }
}
