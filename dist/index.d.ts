/// <reference types="react" />
export declare type ExtensionFunction = (tagName: string, props: {
    [key: string]: any;
}) => {
    [key: string]: any;
};
export declare const extensionContext: React.Context<ExtensionFunction>;
export declare const originalCreateElement: any;
export declare const ExtensionProvider: import("react").Provider<ExtensionFunction>;
