# React Extension

Have you every wished you could extend html attributes to add new functionality? With `react-extension` you can. By decorating the `createElement` function in React, `react-extension` opens up a way to add custom attributes directly to _all_ html tags, globally. This is a really powerful feature, as such it can obviously complicate your code immensly if used carelessly.

## Rationale

I built this library to help with one thing in particular, and that one thing is styling. I've always felt that there is a big disconnect between building components in react and styling time. In my view, CSS just doesn't play by the same rules as javascript based components and I wanted to change that. With the initial idea of trying to figure out a way to make css styling a first class citizen in javascript land, I ended up building this tool.

## Installation

Add the dependency with your preferred tool:

```
yarn add @dwerthen/react-extension
```

You want to import the library as early as possible, at the very top of your entrypoint. (Or at least above the first import of react) This is important since it can't decorate React if the react module is imported first.

If this is cumbersome for whatever reason, and you are using webpack, you can alias this library to get the same effect.

```
webpackConfig.resolve.alias = {
  react$: "@dwerthen/react-extension/react"
}
```
