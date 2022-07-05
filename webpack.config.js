/**
 * @type {import('webpack').Configuration}
 */
const { resolve } = require("path");
const merge = require("webpack-merge");
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development";
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const WebpackBar = require("webpackbar");
const webpackBaseConfig = {
  cache: {
    type: "filesystem",
    // cacheDirectory: resolve(__dirname, '.temp'),
  },
  entry: {
    main: resolve("src/index.js"),
    other: resolve("src/other.js"),
    other2: resolve("src/other2.js"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "swc-loader",
        },
      },
    ],
  },
  // externals: {
  //   react: "React",
  //   "react-dom": "ReactDOM",
  //   "react-router-dom": "ReactRouterDOM",
  //   recoil: "Recoil",
  // },
  optimization: {
    minimize: false,
    runtimeChunk: {
      name: "runtime",
    },
    //规则
    splitChunks: {
      chunks: "initial",
      //   maxAsyncRequests: 5,
      maxInitialRequests: 3,
      maxSize: {
        javascript: 200000,
        style: 120000,
      },
      // minChunks: 1,
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: 0,
        },
      },

      //   // enforceSizeThreshold: 50000,
      //   minChunks: 2,
      //   cacheGroups: {
      //     // vendors: {
      //     //   name: `chunk-vendors`,
      //     //   test: /[\\/]node_modules[\\/]/,
      //     //   priority: -10,
      //     // },
      //     commons: {
      //       // chunks: 'initial',
      //       test: /src\/tools/,
      //       // priority: -20,
      //       name: "commons",
      //       // minChunks:2,
      //       enforce: true,
      //       // reuseExistingChunk: true
      //     },
      //   },
      //   //只有超过了这个字节的才会打包
      //   // 要不要打这个总包出来
      //   // minSize: {
      //   //   javascript: 0,
      //   //   style: 0,
      //   // },
      //   //经验值 拆掉abc ->总包
      //   // maxSize: {
      //   //   javascript: 110000,
      //   //   style: 110000,
      //   // },
    },
  },
  resolve: {
    alias: {
      "@components": resolve("src/web/components"),
      "@atoms": resolve("src/web/recoil/atoms"),
      "@selectors": resolve("src/web/recoil/selectors"),
    },
    extensions: [".js", ".ts", ".tsx", "jsx"],
  },
  plugins: [new WebpackBar()],
};

module.exports = merge.default(webpackBaseConfig, _mergeConfig);
