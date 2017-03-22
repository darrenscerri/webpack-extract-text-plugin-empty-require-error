This repository showcases a Webpack issue along with incorrect handling by `css-loader` and `extract-text-webpack-plugin`.

`index.js` imports `main.css` that has a `url('')` rule. `css-loader` treats this as a module import and incorrectly rewrites `''` as `'./'`. Since there is an `index.js` in the directory where `main.css`, Webpack resolves the `./` to `index.js` and adds a reference to the module in the bundle:

```js
"url(" + __webpack_require__(0) + ")"
```

### `css-loader` issue

Although this might be intended, it might not be correct to require certain files such as Javascript files from CSS.

#### Steps to reproduce

1. `yarn`
2. `yarn build`
3. Open `index.html` in your browser
4. An error is thrown from `index.js` since it's required from `main.css`

### `extract-text-webpack-plugin` issue

`extract-text-webpack-plugin` executes imported files during build. The contents of `index.js` are executed during build time and since an error is thrown from `index.js`, the build fails.

#### Steps to reproduce

1. `yarn`
2. `yarn build:extract`
3. Contents of `index.js` are executed. An error is thrown from `index.js` on build time and the build fails. Output from `console.log` is also displayed.

![Webpack console output](https://cloud.githubusercontent.com/assets/729230/24204564/2aa6353e-0f19-11e7-9046-7481a1419b0b.png)


GitHub issues:

[Extract Text Webpack Plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/465)

CSS Loader [issue #1](https://github.com/webpack-contrib/css-loader/issues/462) [issue #2](https://github.com/webpack-contrib/css-loader/issues/463)

[`loader-utils`](https://github.com/webpack/loader-utils/issues/80)
