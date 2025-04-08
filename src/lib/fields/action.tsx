import {defineField, FieldDefinition} from 'sanity'

import {ActionsType} from '../../types'
import {action} from '../objects/action'

export const actionField = (options?: ActionsType): FieldDefinition => defineField(action(options))
