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

/**
 * Determines whether a given field should be hidden.
 *
 * Fields are **visible by default**, meaning they are only considered hidden
 * if they are explicitly set to `false`. If the field is `undefined` or an
 * object, it is considered visible.
 *
 * @template T - The expected object type of the field when it is visible.
 * @param field - The field value, which can be an object (visible), `false` (hidden), or `undefined` (visible by default).
 * @returns `true` if the field is explicitly set to `false` (hidden), otherwise `false`.
 *
 * @example
 * ```ts
 * const title = { components: 'SomeComponent' };
 * console.log(isFieldHidden(title)); // false (visible)
 *
 * console.log(isFieldHidden(false)); // true (hidden)
 *
 * console.log(isFieldHidden(undefined)); // false (visible)
 * ```
 *
 * @since 1.3.0
 */
export function isFieldHidden<T>(field: T | false | undefined): field is false {
  return field === false
}
