# Carousel Block

A configurable page builder block for managing carousel-style data in Sanity Studio. Ideal for organizing repeatable content like hero sections, images, or other slide-based content.

## Installation

```sh
npm install @trenda/sanity-plugin-page-blocks
```

## Usage

Add it as a plugin in `sanity.config.ts`:

```ts
import {defineConfig} from 'sanity'
import {carouselBlock} from '@trenda/sanity-plugin-page-blocks'

export default defineConfig({
  //...
  plugins: [
    carouselBlock({
      of: [
        // ... add your block types (e.g. { type: 'heroBlock' })
      ],
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
      of: [{type: 'carouselBlock'}],
    }),
  ],
})
```

Use it in the Studio:

![A Sanity Studio interface displaying a page builder array field, with 'Carousel' selected in the 'Add item...' drop down menu.](assets/sanity-plugin-page-blocks-hero-block.png)

### Customization

You can customize the `carouselBlock` schema by passing options when registering the plugin.

#### Schema Name

In Sanity, you cannot register multiple schemas with the same name. If you run into a naming conflict with your own `carouselBlock` schema, or if you wish to register multiple variations of the block, you can override it by passing a custom value to `name`.

```ts
import {defineConfig} from 'sanity'
import {carouselBlock} from '@trenda/sanity-plugin-page-blocks'

export default defineConfig({
  //...
  plugins: [
    carouselBlock({
      name: 'heroCarousel',
      of: [{type: 'heroBlock'}],
    }),
  ],
})
```

## License

[MIT](LICENSE) © James Trenda

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.

### Release new version

Run ["CI & Release" workflow](TODO/actions/workflows/main.yml).
Make sure to select the main branch and check "Release new version".

Semantic release will only release on configured branches, so it is safe to run release on any branch.
