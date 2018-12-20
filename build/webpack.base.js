const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  entry: {
    app: "./src/main.js"
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },

  resolve: {
    extensions: [".js", ".jx", ".json"],
    alias: {
      "@": resolve("src")
    }
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: "weights", to: "weights" },
      { from: "src/images", to: "images" }
    ]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      inject: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  }
};
