import {defineField, FieldDefinition} from 'sanity'

import {ActionsType, ActionType} from '../../types'
import {action} from '../objects/action'

export const actionField = (options?: ActionType): FieldDefinition => defineField(action(options))
