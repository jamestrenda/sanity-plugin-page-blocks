# Article List Block

A configurable page builder block for displaying a list of articles, blog posts, or other structured content. Supports customizable fields, custom fields, and previews.

## Installation

```sh
npm install @trenda/sanity-plugin-page-blocks
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {articleListBlock} from '@trenda/sanity-plugin-page-blocks'

export default defineConfig({
  //...
  plugins: [articleListBlock()],
})
```

### Customization

You can customize the `articleListBlock` schema by passing options when registering the plugin.

#### Example: Custom Schema Name

By default, the schema is named `articleListBlock`. I chose not to use a prefix for two reasons. First, they tend to be visually unappealing. Second, there's still a risk of conflicts with other schema names in your project even with an obscure prefix—which brings me back to the first point: they're ugly.

In Sanity, you cannot register multiple schemas with the same name. If you run into a naming conflict with your own `articleListBlock` schema, you can override it by passing a custom value to `name`.

```ts
import {defineConfig} from 'sanity'
import {articleListBlock} from '@trenda/sanity-plugin-page-blocks'
import {defineField} from 'sanity'

export default defineConfig({
  //...
  plugins: [
    articleListBlock({
      name: 'myArticleListBlock',
      //...
    }),
  ],
})
```

#### Example: Header Field

By default, `articleListBlock` uses a simple `string` field for the header.

```ts
defineField({
  name: 'title',
  title: 'Title',
  type: 'string',
  description: 'Optional title to display above the article list.',
})
```

You may choose to override it with a different kind of field:

```ts
import {defineConfig} from 'sanity'
import {articleListBlock} from '@trenda/sanity-plugin-page-blocks'
import {defineField} from 'sanity'

export default defineConfig({
  //...
  plugins: [
    articleListBlock({
      header: defineField({
        name: 'header',
        title: 'Custom Header',
        type: 'portableText',
      }),
    }),
  ],
})
```

#### Example: Category Field

By default, `articleListBlock` creates a `category` schema and references it in a `categories` field to satisfy the Sanity schema engine. If you pass a value to `categoryField`, as in the example below, the plugin will _not_ create a `category` schema for you.

```ts
defineField({
  name: 'categories',
  title: 'Filter by Categories',
  type: 'array',
  of: [{type: 'reference', to: [{type: 'category'}]}],
  description: 'Optional: Show only articles from selected categories.',
})
```

If your project uses a different schema name (e.g., tags), or if you want to change other things about the field, you can override it with your own field:

```ts
import {defineConfig} from 'sanity'
import {articleListBlock} from '@trenda/sanity-plugin-page-blocks'
import {defineField} from 'sanity'

export default defineConfig({
  //...
  plugins: [
    articleListBlock({
      categoryField: defineField({
        name: 'tags',
        title: 'Filter by Tag',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'tag'}]}],
        description: 'Optional: Show only articles from selected tags.',
      }),
    }),
  ],
})
```

#### Example: Custom Fields

You can extend the schema with additional fields:

```ts
import {defineConfig} from 'sanity'
import {articleListBlock} from '@trenda/sanity-plugin-page-blocks'
import {defineField} from 'sanity'

export default defineConfig({
  //...
  plugins: [
    articleListBlock({
      customFields: [
        defineField({
          name: 'myCustomField',
          title: 'My Custom Field',
          type: 'string',
        }),
      ],
    }),
  ],
})
```

#### Example: Custom Preview

You can add your own preview config:

```ts
import {defineConfig} from 'sanity'
import {articleListBlock} from '@trenda/sanity-plugin-page-blocks'
import {defineField} from 'sanity'

export default defineConfig({
  //...
  plugins: [
    articleListBlock({
      header: defineField({
        name: 'header',
        title: 'Custom Header',
        type: 'portableText',
      }),
      // custom preview config
      preview: {
        select: {
          header: 'header',
        },
        prepare(selection) {
          // NOTE: Not included with this plugin!
          // A function that extracts the value of the first major heading in a portableText editor—with a fallback value
          const preview = getPortableTextPreview(selection.header, 'Article List')

          return preview
        },
      },
    }),
  ],
})
```

## Update Page Builder Schema

Finally, like all page builder blocks, you need to register it in the schema where you plan to use it:

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
      of: [{type: 'articleListBlock'}],
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
