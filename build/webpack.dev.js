const merge = require("webpack-merge");
const common = require("./webpack.base.js");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    host: "0.0.0.0",
    contentBase: "./dist",
    historyApiFallback: true // 对于SPA调试非常有用，若不加将跳转失败
  }
});
