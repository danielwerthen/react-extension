import { ExtensionProvider } from "@dwerthen/react-extension";
import React, { cloneElement } from "@dwerthen/react-extension/react";
import "./react.d.ts";
import logo from "./logo.svg";
import "./App.css";

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

function App() {
  return (
    <ExtensionProvider value={extend}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p $backgroundColor="blue">
            Edit <code $color="red">src/App.tsx</code> and save to reload.
          </p>
          {cloneElement(<p>Daniel</p>, { $color: "yellow" })}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </ExtensionProvider>
  );
}

export default App;
