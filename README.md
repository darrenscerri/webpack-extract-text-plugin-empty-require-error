This repository showcases a Webpack issue along with incorrect handling by `css-loader` and `extract-text-webpack-plugin`.

`index.js` imports `main.css` that has a `url('')` rule. `css-loader` treats this as a module import. Webpack tries to import the module defined by `''` that is incorrectly treated as `'./'`. Since there is an `index.js` in the directory where `main.css`, Webpack resolves the `url('')` to `index.js` and substitutes `''` to `index.js`.

```js
"url(" + __webpack_require__(0) + ")"
```

### Webpack `require('')` issue

`require('')` should be a noop and not treated as `require('./')`. Although this is fixed by https://github.com/webpack/webpack/issues/2006, this issue still persists internally through loaders with Webpack v2.3.1. (See `css-loader` issue)

#### Steps to reproduce

1. `yarn`
2. `yarn build`
3. Webpack should issue a warning for trying to import `''`, in the same way it warns for an actual `require('')`

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

[CSS Loader](https://github.com/webpack-contrib/css-loader/issues/462)

[Webpack](https://github.com/webpack/webpack/issues/4541)
