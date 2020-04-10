const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-pages-404-js": hot(preferDefault(require("/home/pedror/Documents/PypKa-Server-Front/src/pages/404.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/home/pedror/Documents/PypKa-Server-Front/src/pages/index.js"))),
  "component---src-pages-latest-js": hot(preferDefault(require("/home/pedror/Documents/PypKa-Server-Front/src/pages/latest.js"))),
  "component---src-pages-results-js": hot(preferDefault(require("/home/pedror/Documents/PypKa-Server-Front/src/pages/results.js"))),
  "component---src-pages-run-pypka-js": hot(preferDefault(require("/home/pedror/Documents/PypKa-Server-Front/src/pages/run-pypka.js")))
}

