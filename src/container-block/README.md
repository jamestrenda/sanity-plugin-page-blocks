# Container Block

A configurable page builder block for multi-purpose container sections.

## Installation

```sh
npm install @trenda/sanity-plugin-page-blocks
```

## Usage

Add it as a plugin in `sanity.config.ts`:

```ts
import {defineConfig} from 'sanity'
import {containerBlock} from '@trenda/sanity-plugin-page-blocks'

export default defineConfig({
  //...
  plugins: [
    containerBlock({
      blocks: {
        of: [
          {
            type: 'textBlock',
          },
          // ... other block types
        ],
      },
    }),
  ],
})
```

Register it in the schema where you plan to use it:

```ts
import {defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    //...
    defineField({
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [{type: 'containerBlock'}],
    }),
  ],
})
```

## Customization

### Block Variations

You might want multiple versions of a block. Calling `containerBlock` with a unique `name` will create a version of the **Container Block** schema with that name. You don't need to maintain two versions. If you just need one, but you want to customize the name, you can just register the plugin once.

```ts
import {defineConfig} from 'sanity'
import {containerBlock} from '@trenda/sanity-plugin-page-blocks'
import {RatioIcon} from 'lucide-react'

export default defineConfig({
  //...
  plugins: [
    containerBlock({
      name: 'fullBleedContainerBlock',
      blocks: {
        of: [
          {
            type: 'textBlock',
          },
          // ... other block types
        ],
      },
      // optionally, override the preview config
      preview: {
        select: {
          title: 'title',
        },
        prepare(selection) {
          return {
            title: selection.title,
            subtitle: 'Full-Bleed Container Block',
            media: <RatioIcon size="1em" />,
          }
        },
      },
    }),
  ],
})
```

This block is useful for other scenarios as well, like defining your own `column` page block:

```ts
containerBlock({
  name: 'column',
  image: false,
  content: false,
  blocks: {
    of: [
      //...
      {
        type: 'textBlock',
      },
    ],
  },
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title,
        subtitle: 'Column',
        media: Columns3Icon, // import from Lucide
      }
    },
  },
})
```

Make sure to add it to the schema where you plan to use it:

```ts
import {defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    //...
    defineField({
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [
        {type: 'fullBleedContainerBlock'},
        {type: 'column', title: 'Column', icon: () => <Columns3Icon size="1em" />}
      ],
    }),
  ],
})
```

### Image

**Container Block** comes with an `image` field by default. If you don't need this, you can remove it:

```ts
import {defineConfig} from 'sanity'
import {containerBlock} from '@trenda/sanity-plugin-page-blocks'

export default defineConfig({
  //...
  plugins: [
    containerBlock({
      //...
      image: false,
    }),
  ],
})
```

## License

[MIT](../../LICENSE) © James Trenda

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.

### Release new version

Run ["CI & Release" workflow](TODO/actions/workflows/main.yml).
Make sure to select the main branch and check "Release new version".

Semantic release will only release on configured branches, so it is safe to run release on any branch.
