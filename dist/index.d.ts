/// <reference types="react" />
export declare type ExtensionFunction<P extends {}> = (tagName: React.FunctionComponent<P> | React.ComponentClass<P> | string, props?: (React.Attributes & P) | null, ...children: React.ReactNode[]) => [React.FunctionComponent<P> | React.ComponentClass<P> | string, (React.Attributes & P) | null | undefined, React.ReactNode[]];
export declare const store: [ExtensionFunction<{}>, Symbol][];
export declare const applyExtensions: (createElement: any, type: React.ElementType, props: Object, ...children: React.ReactNode[]) => any;
export declare function extend(reactModule: any): void;
export declare type TeardownCallback = () => void;
export declare function registerExtension<P extends {}>(fn: ExtensionFunction<P>): TeardownCallback;
export declare function registerPropExtension<P extends {}, T extends {}>(fn: (props: P) => T): TeardownCallback;
