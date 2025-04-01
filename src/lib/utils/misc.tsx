import React from 'react'
import {PreviewValue} from 'sanity'

export const prepareOutput = ({
  title,
  subtitle,
  media,
}: {
  title: string
  subtitle?: string
  media?: React.ReactNode
}): PreviewValue => {
  return {
    title,
    subtitle,
    media,
  }
}
