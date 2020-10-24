var { extend } = require("./dist/index");

var react;
if (process.env.NODE_ENV === "production") {
  react = require("react/cjs/react.production.min.js");
} else {
  react = require("react/cjs/react.development.js");
}
extend(react)

module.exports = react
