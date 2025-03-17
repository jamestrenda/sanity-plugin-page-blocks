# Sanity Page Blocks

A collection of **plug-and-play page builder blocks** for Sanity Studio. These blocks are designed to **reduce initial schema definition time** while remaining **flexible enough** to fit a wide range of projects.

## Why This Plugin?

Sanity provides a highly customizable content structure, but setting up reusable page-building blocks can be **time-consuming and repetitive**. While there are plenty of **starter templates** in the Sanity community, they often come with **a full project structure, front-end implementation, and opinionated schemas**—you _might_ not want all of that.

You _might_ already have a project—either with a page builder schema or one that you would like to convert to a page builer schema. Or you _might_ want to use an existing starter template, but you're looking for more page builder blocks that you can just drop into your project. If any of those scenarios describe your project, you _might_ want this plugin.

### A Different Approach

Instead of providing a **full project starter**, these plugins are like **_starter templates for schemas_**. They are:

- **Modular** - Use only the blocks you need, without extra overhead.
- **Customizable** - Tailor fields and settings to match your content model.
- **Flexible** - Can be dropped into **new or existing projects** without requiring major changes.
- **Fast to implement** - Reduce the time spent on boilerplate schema setup.

## Available Blocks

### [Article List Block](./src/article-list-block)

A configurable block for listing articles, blog posts, or other structured content. Supports **customizable fields, custom fields, and previews**.

## Installation

To install `@trenda/sanity-plugin-page-blocks`, run:

```sh
npm install @trenda/sanity-plugin-page-blocks
```

or with pnpm:

```sh
pnpm add @trenda/sanity-plugin-page-blocks
```

## Peer Dependencies

This plugin requires the following dependencies to be installed in your Sanity Studio project:

```sh
npm install lucide-react
```

or:

```sh
pnpm add lucide-react
```

These dependencies are not bundled with the plugin to ensure compatibility with your project’s version of React and Sanity.

## Basic Usage

Use only the blocks you want.

```ts
import {defineConfig} from 'sanity'
import {articleListBlock} from '@trenda/sanity-plugin-page-blocks/article-list-block'

export default defineConfig({
  plugins: [articleListBlock()],
})
```

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
