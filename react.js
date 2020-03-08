require("./dist/index");
if (process.env.NODE_ENV === "production") {
  module.exports = require("react/cjs/react.production.min.js");
} else {
  module.exports = require("react/cjs/react.development.js");
}
