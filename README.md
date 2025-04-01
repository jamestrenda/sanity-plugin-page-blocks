IMPORTANT: Version < 1.5 should be considered Beta. I know, I know—that's bush league, bro. But it is what it is.

> This is a **Sanity Studio v3** plugin.

# Sanity Page Blocks

A collection of type-safe, lightly-opinionated **plug-and-play page builder blocks** for Sanity Studio. These blocks are designed to **reduce initial schema definition time** while remaining **flexible enough** to fit a wide range of projects.

## Why This Plugin?

Sanity provides a highly customizable content structure, but setting up reusable page-building blocks can be **time-consuming and repetitive**. As more Sanity projects embrace a page-building Studio experience, having a robust library of block schemas can help teams get up and running quickly.

While there are plenty of **starter templates** in the Sanity community, they often come with **a full project structure, front-end implementation, and opinionated schemas**—you _might_ not want all of that.

You _might_ already have a project—either with a page builder schema or one that you would like to convert to a page builer schema. Or you _might_ want to use an existing starter template, but you're looking for more page builder blocks that you can just drop into your project.

If any of those scenarios describe your project, you _might_ want this plugin.

### A Different Approach

Instead of providing a **full project starter**, these plugins are like **_starter templates for schemas_**. They are:

- **Modular** - Use only the blocks you need, without extra overhead.
- **Customizable** - Tailor fields and settings to match your content model.
- **Flexible** - Can be dropped into **new or existing projects** without requiring major changes.
- **Fast to implement** - Reduce the time spent on boilerplate schema setup.
- **Lightly-opinionated** - Most schemas are designed without assumptions about how they'll be implemented in your UI. You won't find terms like "Grid" or "Accordion" here, as you may prefer a different styling approach. The naming conventions are intentionally neutral to keep things flexible.

## Available Blocks

- [Article Feed Block](./src/article-feed-block)
- [Article List Block](./src/article-list-block)
- [FAQ Block](./src/faq-block/)
- [Text Block](./src/text-block)

## Installation

```sh
npm install @trenda/sanity-plugin-page-blocks
```

or with pnpm:

```sh
pnpm add @trenda/sanity-plugin-page-blocks
```

## Peer Dependencies

This plugin utilizes [Lucide Icons](https://lucide.dev/) and requires the following dependencies to be installed in your Sanity Studio project:

```sh
npm install lucide-react
```

or:

```sh
pnpm add lucide-react
```

## Customization

Each block can be customized by passing options when registering the plugin.

### Schema Name

Sanity does not allow multiple schemas with the same name. If you have a naming conflict with an existing schema or need to register multiple instances of the same block, you can override the default schema name by passing a custom value to name. This flexibility allows you to register multiple variations of a block within your Sanity project while avoiding conflicts.

```ts
import {defineConfig} from 'sanity'
import {articleListBlock} from '@trenda/sanity-plugin-page-blocks'

export default defineConfig({
  //...
  plugins: [
    articleListBlock({
      name: 'customArticleListBlock',
      // Other options...
    }),
  ],
})
```

### Fieldsets and Groups

Every block supports Sanity fieldsets and groups. To add a custom fieldsets and/or groups, pass an object where you define the structure of your fieldsets and groups and then assign fields to it.

```ts
import {defineConfig, defineField} from 'sanity'
import {articleListBlock} from '@trenda/sanity-plugin-page-blocks'

export default defineConfig({
  //...
  plugins: [
    articleListBlock({
      articleTypes: ['post', 'episode', 'recipe'],
      fieldsets: [{name: 'header', title: 'Header'}],
      groups: [
        {
          name: 'main-content',
          title: 'Content',
        },
      ],
      // assign the default title field to fieldsets and groups
      title: {
        fieldset: 'header',
        group: 'main-content',
      },
    }),
  ],
})
```

### Custom Fields

Every block includes a set of standard fields to get you started, but you can extend any block with additional fields as needed. This allows you to customize the schema without having to build your own from scratch, making it easy to adapt to your specific requirements.

```ts
export default defineConfig({
  //...
  plugins: [
    textBlock({
      customFields: [
        defineField({
          name: 'anchor',
          title: 'Anchor',
          type: 'string',
        }),
      ],
    }),
  ],
})
```

### Components

Every block supports schema-level and field-level components.

```ts
export default defineConfig({
  //...
  plugins: [
    faqBlock({
      title: {
        components: {
          field: CharCountInput,
        },
      },
      faqs: {
        // ...
        components: {
          field: CustomField,
        },
      },
      components: {
        input: MyCustomInput,
      },
    }),
  ],
})
```

### Removing Fields

Every block has at least one core field, but many of the blocks have at least one additonal field that is more supportive in nature. If you find you don't need these fields, there's no sense in keeping them around in your schema. You can remove these less critical fields by passing `false` for the corresponding option.

This completely excludes the field from the schema, rather than just hiding it in the Studio UI. If you find yourself needing to remove a core field, then you probably want to choose a different block altogether—or build your own custom block from scratch.

```ts
import {defineConfig} from 'sanity'
import {faqBlock} from '@trenda/sanity-plugin-page-blocks'

export default defineConfig({
  //...
  plugins: [
    faqBlock({
      title: false, // Removes the title field from the schema
    }),
  ],
})
```

Some schemas support a `header` option, allowing you to define a custom title field. When a `header` is provided, it automatically replaces the default title field, eliminating the need to remove it manually.

```ts
import {defineConfig, defineField} from 'sanity'
import {articleListBlock} from '@trenda/sanity-plugin-page-blocks'

export default defineConfig({
  //...
  plugins: [
    articleListBlock({
      header: defineField({
        name: 'header',
        title: 'Custom Header',
        type: 'array',
        of: [{type: 'block'}],
      }),
    }),
  ],
})
```

### Options

Many Sanity field types support an `options` property. This is not yet implemented in this plugin.

TODO: Add support for custom `options`.

## Coming Soon

This is just the beginning! More **pre-configured page builder blocks** are in development, including:

- **Hero Block**
- **Media Block**
- **Logo Cloud Block**
- **Image/Text Split Block**
- **Icon Card Block**
- **Featured Section Block**
- **Call-to-Action Block**
- **Testimonials Block**
- **Global Section Block**
- **And more...**

These plugins will make it even easier to build **rich, structured pages** in Sanity Studio without reinventing the wheel. Stay tuned for updates! 🚀

## Contributing

Contributions are welcome! Feel free to open issues or pull requests.

## License

[MIT](LICENSE) © James Trenda

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.

### Release new version

Run ["CI & Release" workflow](https://github.com/jamestrenda/sanity-plugin-page-blocks/actions/workflows/main.yml).
Make sure to select the main branch and check "Release new version".

Semantic release will only release on configured branches, so it is safe to run release on any branch.
