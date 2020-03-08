const reactModule = require("react");

export const extensionContext = reactModule.createContext();

const reactCreateElement = reactModule.createElement;

const cache: { [key: string]: React.FunctionComponent } = {};
function _extendTag(tagName: string): React.FunctionComponent {
  const Component = reactModule.forwardRef((props: unknown, ref: unknown) => {
    const extender = reactModule.useContext(extensionContext);
    const newProps = typeof extender === "function" ? extender(props) : props;
    return reactCreateElement(tagName, { ...newProps, ref });
  });
  if (process.env.NODE_ENV !== "production") {
    Component.displayName = tagName;
  }
  return Component;
}

function extendTag(tagName: string): React.FunctionComponent {
  return cache[tagName] || (cache[tagName] = _extendTag(tagName));
}

reactModule.createElement = function extendedCreateElement(
  tag: any,
  props: any,
  ...children: any
) {
  const newTag = typeof tag === "string" ? extendTag(tag) : tag;
  return reactCreateElement(newTag, props, ...children);
};

export const ExtensionProvider = extensionContext.Provider;
