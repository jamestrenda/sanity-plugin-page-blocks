import {defineField, FieldDefinition, ReferenceTo} from 'sanity'

import {action} from '../objects/action'

export const actionField = (types: ReferenceTo): FieldDefinition => defineField(action(types))
