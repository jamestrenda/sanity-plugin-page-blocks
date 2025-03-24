import React from 'react'

export function Description({
  title = "What's this?",
  children,
}: {
  title?: string
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <details>
      <summary>{title} 👀</summary>
      {children}
    </details>
  )
}
