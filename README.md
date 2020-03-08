# React Extension

Have you every wished you could extend html attributes to add new functionality? With `react-extension` you can. By decorating the `createElement` function in React, `react-extension` opens up a way to add custom attributes directly to _all_ html tags, globally. This is a really powerful feature, as such it can obviously complicate your code immensly if used carelessly.

## Rationale

I built this library to help with one thing in particular, and that one thing is styling. I've always felt that there is a big disconnect between building components in react and styling time. In my view, CSS just doesn't play by the same rules as javascript based components and I wanted to change that. With the initial idea of trying to figure out a way to make css styling a first class citizen in javascript land, I ended up building this tool.

## Installation

Add the dependency with your preferred tool:

```bash
yarn add @dwerthen/react-extension
```

You want to import the library as early as possible, at the very top of your entrypoint. (Or at least above the first import of react) This is important since it can't decorate React if the react module is imported first.

If this is cumbersome for whatever reason, and you are using webpack, you can alias this library to get the same effect.

```js
webpackConfig.resolve.alias = {
  react$: "@dwerthen/react-extension/react"
};
```

## Useage

When you have initialized the library properly. You can wrapp your react app with the `ExtensionProvider` and provide an extend function.

```tsx
import React from "react";
import { ExtensionProvider } from "@dwerthen/react-extension";

function extend(tagName: string, props: { [key: string]: any }) {
  const newProps: { [key: string]: any } = {};
  const newStyle: { [key: string]: any } = {};
  for (var key in props) {
    if (props.hasOwnProperty(key)) {
      const val = props[key];
      if (key[0] === "$") {
        newStyle[key.substr(1)] = val;
      } else {
        newProps[key] = val;
      }
    }
  }
  if (Object.keys(newStyle).length > 0) {
    return {
      ...newProps,
      style: {
        ...newProps.style,
        ...newStyle
      }
    };
  }
  return newProps;
}

export default function App({ children }) {
  return (
    <ExtensionProvider value={extend}>
      <p $color="red">
        Inside the extension provider I can use `$` prefixed props to set inline
        styling at the top level.
      </p>
      {children}
    </ExtensionProvider>
  );
}
```

If you are using Typescript you also might want to extend the `HTMLAttributes<T>` interface, to avoid getting warnings that the new custom props are invalid.

One alternative, if the custom props you have added is dynamic, and to many to list, is to enable any key in the interface like this:

```ts
import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    [key: string]: any;
  }
}
```

This example is obviously a bit contrived. To see what I use this extension for, checkout https://github.com/danielwerthen/stilren.

## Custom components

Since the extension happens at the createElement level, it works just as well with custom components too. As long as the component spreads any extra props onto their html nodes. Which is why we can write something like:

```jsx
import { Button } from "@material-ui/core";

<Button $backgroundColor="red">It just works</Button>;
```

Using the extend function above, there is no need to make any modification to the used custom component.
