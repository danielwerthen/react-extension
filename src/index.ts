export type ExtensionFunction<P extends {}> = (
  tagName: React.FunctionComponent<P> | React.ComponentClass<P> | string,
  props?: (React.Attributes & P) | null,
  ...children: React.ReactNode[]
) => [
  React.FunctionComponent<P> | React.ComponentClass<P> | string,
  (React.Attributes & P) | null | undefined,
  React.ReactNode[]
];

const STORE_KEY = Symbol.for("@dwerthen/react-extension/Store");
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasContext = globalSymbols.indexOf(STORE_KEY) > -1;

if (!hasContext) {
  (global as any)[STORE_KEY] = [];
}

export const store: [ExtensionFunction<{}>, Symbol][] = (global as any)[
  STORE_KEY
];

export const applyExtensions = (
  createElement: any,
  type: React.ElementType,
  props: Object,
  ...children: React.ReactNode[]
) => {
  const [nextTag, nextProps, nextChildren] = store.reduce(
    (
      [tag, props, children]: [
        React.FunctionComponent<{}> | React.ComponentClass<{}> | string,
        (React.Attributes & {}) | null | undefined,
        React.ReactNode[]
      ],
      [fn]
    ) => fn(tag, props, ...children),
    [type, props, children]
  );
  return createElement(nextTag, nextProps, ...nextChildren);
};

export function extend(reactModule: any) {
  const oldCE = reactModule.createElement;
  reactModule.createElement = (...args: any) =>
    (applyExtensions as any)(oldCE, ...args);
}

export type TeardownCallback = () => void;

export function registerExtension<P extends {}>(
  fn: ExtensionFunction<P>
): TeardownCallback {
  const id = Symbol();
  store.unshift([fn as ExtensionFunction<{}>, id]);
  return () => {
    const idx = store.findIndex(([_fn, sym]) => sym === id);
    if (idx > -1) {
      store.splice(idx, 1);
    }
  };
}

export function registerPropExtension<P extends {}, T extends {}>(
  fn: (props: P) => T
) {
  return registerExtension((tagName, props?, ...children) => {
    return [
      tagName,
      typeof props === "object" ? fn(props as P) : props,
      children,
    ];
  });
}
