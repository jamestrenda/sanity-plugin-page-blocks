export function normalize(obj: unknown) {
  return JSON.parse(JSON.stringify(obj))
}

export function sanitizeSchema(schema: unknown): unknown {
  return JSON.parse(
    JSON.stringify(schema, (_key, value) => {
      // Strip out React elements or preview definitions
      if (typeof value === 'object' && value !== null) {
        if ('preview' in value) delete value.preview
        if ('icon' in value) delete value.icon
      }
      return value
    }),
  )
}
