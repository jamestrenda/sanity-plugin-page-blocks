# Call To Action Block

A configurable page builder block for call-to-action sections. Includes essential fields—text, image, and a required actions field—designed around common CTA patterns. The text and image fields are fully optional and extensible, giving you precise control over the editing experience while keeping the call-to-action core intact.

## Installation

```sh
npm install @trenda/sanity-plugin-page-blocks
```

## Usage

Add it as a plugin in `sanity.config.ts`:

```ts
import {defineConfig} from 'sanity'
import {callToActionBlock} from '@trenda/sanity-plugin-page-blocks'

export default defineConfig({
  //...
  plugins: [callToActionBlock()],
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
      of: [{type: 'callToActionBlock'}],
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
import {callToActionBlock} from '@trenda/sanity-plugin-page-blocks'

export default defineConfig({
  //...
  plugins: [
    callToActionBlock({
      name: 'simpleCTA',
      text: false,
    }),
  ],
})
```

#### Text Field

See [Hero](../hero-block/README.md)

#### Image Field

See [Hero](../hero-block/README.md)

#### Actions

See [Hero](../hero-block/README.md)
