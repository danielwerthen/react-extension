import { ExtensionProvider } from "@dwerthen/react-extension";
import "../react.d.ts";
// import App from 'next/app'

function extend(_tagName: string, props: { [key: string]: any }) {
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

function MyApp({ Component, pageProps }: any) {
  return (
    <ExtensionProvider value={extend}>
      <Component {...pageProps} />
    </ExtensionProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
