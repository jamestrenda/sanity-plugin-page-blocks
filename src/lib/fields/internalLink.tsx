import {defineField, ReferenceTo} from 'sanity'

import {internalLink} from '../objects/internalLink'

export const internalLinkField = (types: ReferenceTo) => defineField(internalLink(types))
