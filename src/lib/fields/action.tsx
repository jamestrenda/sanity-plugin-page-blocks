import {defineField, FieldDefinition} from 'sanity'

import {HeroActionsType} from '../../hero-block/types'
import {action} from '../objects/action'

export const actionField = (options?: HeroActionsType): FieldDefinition =>
  defineField(action(options))
