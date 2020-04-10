// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-pages-404-js": () => import("./../src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */),
  "component---src-pages-index-js": () => import("./../src/pages/index.js" /* webpackChunkName: "component---src-pages-index-js" */),
  "component---src-pages-latest-js": () => import("./../src/pages/latest.js" /* webpackChunkName: "component---src-pages-latest-js" */),
  "component---src-pages-results-js": () => import("./../src/pages/results.js" /* webpackChunkName: "component---src-pages-results-js" */),
  "component---src-pages-run-pypka-js": () => import("./../src/pages/run-pypka.js" /* webpackChunkName: "component---src-pages-run-pypka-js" */)
}

