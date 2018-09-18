const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(pathToCheck, needsSlash) {
  const hasSlash = pathToCheck.endsWith('/');
  if (hasSlash && !needsSlash) {
    return pathToCheck.substr(pathToCheck, pathToCheck.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${pathToCheck}/`;
  }
  return pathToCheck;
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

// Use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

module.exports = {
  ENV: resolveApp('.env'),
  PUBLIC_URL: getPublicUrl(resolveApp('package.json')),
  SERVED_PATH: getServedPath(resolveApp('package.json')),
  APP: {
    ROOT: appDirectory,
    BUILD: resolveApp('build'),
    PUBLIC: resolveApp('public'),
    HTML: resolveApp('public/index.html'),
    INDEX: resolveApp('src/index.js'),
    PACKAGEJSON: resolveApp('package.json'),
    SRC: resolveApp('src'),
    NODE_MODULES: resolveApp('node_modules'),
  },
};
