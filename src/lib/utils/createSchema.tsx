import React from 'react'
import {FieldDefinition, FieldGroupDefinition, SchemaTypeDefinition} from 'sanity'

import {SchemaBaseFields} from '../../types'

/**
 * Merges user-defined field groups with default field groups.
 *
 * If a user-defined group has the same `name` as a default group, the properties of the default group
 * will be overwritten by the user-defined group while keeping any properties not explicitly provided by the user.
 * Any additional user-defined groups that do not exist in the default groups will be appended to the result.
 *
 * @param {FieldGroupDefinition[]} defaultGroups - The default field groups provided by the plugin.
 * @param {FieldGroupDefinition[]} [userGroups] - Optional user-defined field groups that override or extend the defaults.
 * @returns {FieldGroupDefinition[]} - The merged array of field groups, ensuring defaults are respected while allowing user overrides.
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
export function mergeGroups(
  defaultGroups: FieldGroupDefinition[],
  userGroups?: FieldGroupDefinition[],
): FieldGroupDefinition[] {
  return [
    ...defaultGroups.map((defaultGroup) => {
      const userGroup = userGroups?.find((group) => group.name === defaultGroup.name)
      return userGroup ? {...defaultGroup, ...userGroup} : defaultGroup
    }),
    ...(userGroups?.filter(
      (group) => !defaultGroups.some((defaultGroup) => defaultGroup.name === group.name),
    ) ?? []),
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

/** Type-safe utility to filter out hidden fields */
// export function getVisibleFields<T extends FieldDefinition>(
//   fields: T[],
//   options: Record<string, any>,
// ): T[] {
//   return fields.filter(({name}) => !isFieldHidden(options?.[name as keyof typeof options]))
// }

export function getVisibleFields<T extends FieldDefinition, O extends Record<string, unknown>>(
  fields: T[],
  options: O,
): T[] {
  return fields.filter(({name}) => !isFieldHidden(options?.[name as keyof O]))
}

export function createFieldConfig<
  T extends {
    components?: T['components']
    fieldset?: FieldDefinition['fieldset']
    group?: FieldDefinition['group']
  },
>(options: T | undefined) {
  return {
    components: options?.components ?? undefined,
    fieldset: options?.fieldset ?? undefined,
    group: options?.group ?? undefined,
  }
}

/** Utility to generate a schema base structure */
// export function createSchema<T extends SchemaBaseFields>(
//   config: T & SchemaTypeDefinition
// ): SchemaTypeDefinition
export function createSchema<T extends Record<string, unknown> & SchemaBaseFields>({
  name,
  title,
  icon,
  fields,
  options,
}: {
  name: string
  title: string
  icon: () => React.JSX.Element
  fields: FieldDefinition[]
  options?: T
}): SchemaTypeDefinition {
  const groups = mergeGroups([], options?.groups)
  const visibleFields = options ? getVisibleFields(fields, options) : fields

  return {
    name: options?.name ?? name,
    title,
    type: 'object',
    fieldsets: [...(options?.fieldsets ?? [])],
    groups,
    icon,
    preview: options?.preview ?? undefined, // TODO: make a default preview
    fields: visibleFields,
    components: options?.components,
  }
}
