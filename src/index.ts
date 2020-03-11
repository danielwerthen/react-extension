let reactModule: any;
if (process.env.NODE_ENV === "production") {
  reactModule = require("react/cjs/react.production.min.js");
} else {
  reactModule = require("react/cjs/react.development.js");
}

export type ExtensionFunction = (
  tagName: string,
  props: { [key: string]: any }
) => { [key: string]: any };

export const extensionContext: React.Context<ExtensionFunction> = reactModule.createContext();

export const originalCreateElement = reactModule.createElement;

const cache: { [key: string]: React.FunctionComponent } = {};
function _extendTag(tagName: string): React.FunctionComponent {
  const Component = reactModule.forwardRef(
    (props: { [key: string]: any }, ref: unknown) => {
      const extender = reactModule.useContext(extensionContext);
      const newProps =
        typeof extender === "function" ? extender(tagName, props) : props;
      return originalCreateElement(tagName, { ...newProps, ref });
    }
  );
  if (process.env.NODE_ENV !== "production") {
    Component.displayName = tagName;
  }
  return Component;
}

function extendTag(tagName: string): React.FunctionComponent {
  return cache[tagName] || (cache[tagName] = _extendTag(tagName));
}

export function extendedCreateElement(tag: any, props: any, ...children: any) {
  const newTag = typeof tag === "string" ? extendTag(tag) : tag;
  return originalCreateElement(newTag, props, ...children);
}

reactModule.createElement = extendedCreateElement;

export const ExtensionProvider = extensionContext.Provider;
