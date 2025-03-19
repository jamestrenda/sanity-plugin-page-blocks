> This is a **Sanity Studio v3** plugin.

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

- [Article Feed Block](./src/article-feed-block)
- [Article List Block](./src/article-list-block)
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
