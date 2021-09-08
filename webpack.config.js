const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "./src"),
  entry: "./main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./index.html",
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              // localIdentName: "[name]__[local]--[hash:base64:5]",
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
};
