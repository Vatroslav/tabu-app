# 2025-01-28 Fix for "process is not defined" Error

## Problem
The error `Uncaught ReferenceError: process is not defined` occurred because the `process` object is a Node.js global object and is not available in the browser environment. The issue was encountered in the `src/router/index.js` and `src/main.js` files.

## Solution
To resolve this issue, the following steps were taken:

1. **Update `src/router/index.js`**:
   - Ensure that the `process` object is only used if it is defined. This was done by checking if `process` is defined before using it.
   ```javascript
   history: createWebHistory(typeof process !== 'undefined' ? process.env.BASE_URL || '/' : '/'),
   ```

2. **Update `src/main.js`**:
   - Ensure that the `process` object is only used if it is defined. This was done by checking if `process` is defined before using it.
   ```javascript
   clientId: typeof process !== 'undefined' ? process.env.VUE_APP_OAUTH_CLIENT_ID : '',
   ```

3. **Update `public/index.html`**:
   - Ensure that the Vue app mounts correctly by deferring the loading of the `bundle.js` script.
   ```html
   <script defer src="bundle.js"></script>
   ```

## Additional Steps
- Installed necessary packages (`@babel/core`, `@babel/preset-env`, `babel-loader`, `vue-loader`, `vue-template-compiler`, `css-loader`, `style-loader`, `webpack`, `webpack-cli`) to handle ES6 modules, `.vue` files, and CSS.
- Configured `webpack.config.js` to bundle the JavaScript and CSS files.
- Configured `server.js` to serve static files from the `public` and `src` directories.

## Conclusion
By ensuring that the `process` object is only used in the Node.js environment and deferring the loading of the `bundle.js` script, the issue was resolved, and the application now works correctly.
