# Action Block

A configurable page builder block for single actions like a button or link.

## Installation

```sh
npm install @trenda/sanity-plugin-page-blocks
```

## Usage

Add it as a plugin in `sanity.config.ts`:

```ts
import {defineConfig} from 'sanity'
import {actionBlock} from '@trenda/sanity-plugin-page-blocks'

export default defineConfig({
  //...
  plugins: [actionBlock()],
})
```

Register it in the schema where you plan to use it:

```ts
import {defineField, defineType} from 'sanity'

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    //...
    defineField({
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [
        // {
        //   type: 'siteLogoBlock'
        // },
        // {
        //   type: 'menu'
        // },
        {
          type: 'actionBlock',
        },
      ],
    }),
  ],
})
```

### Customization

You can customize the schema by passing options when registering the plugin.

#### Schema Name

In Sanity, you cannot register multiple schemas with the same name. If you run into a naming conflicts, or if you wish to register multiple variations of the block, you can override it by passing a custom value to `name`.

```ts
import {defineConfig} from 'sanity'
import {actionBlock} from '@trenda/sanity-plugin-page-blocks'

export default defineConfig({
  //...
  plugins: [
    actionBlock({
      name: 'button',
    }),
  ],
})
```

#### Actions

For now, refer to [Hero Block](../hero-block/README.md) to see how the actions themselves work.
