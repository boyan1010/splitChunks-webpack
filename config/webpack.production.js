const TerserPlugin = require("terser-webpack-plugin");
const os = require("os");
const { join } = require("path");
module.exports = {
  output: {
    path: join(__dirname, "../dist/assets"),
    publicPath: "/assets/[name].[contenthash:5].bundule.[ext]",
    filename: "scripts/[name].[contenthash:5].bundule.js",
    assetModuleFilename: "",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: os.cpus().length - 1,
      }),
    ],
  },
  plugins: [],
};
