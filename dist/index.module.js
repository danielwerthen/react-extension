var e,r=(e="production"===process.env.NODE_ENV?require("react/cjs/react.production.min.js"):require("react/cjs/react.development.js")).createContext(),t=e.createElement,n={};function o(o,c){for(var a=[],i=arguments.length-2;i-- >0;)a[i]=arguments[i+2];var s,u="string"==typeof o?n[s=o]||(n[s]=function(n){var o=e.forwardRef(function(o,c){var a=e.useContext(r),i="function"==typeof a?a(n,o):o;return t(n,Object.assign({},i,{ref:c}))});return"production"!==process.env.NODE_ENV&&(o.displayName=n),o}(s)):o;return t.apply(void 0,[u,c].concat(a))}e.createElement=o;var c=r.Provider;export{r as extensionContext,t as originalCreateElement,o as extendedCreateElement,c as ExtensionProvider};
//# sourceMappingURL=index.module.js.map
