const path = require("path");

const webpack = require("webpack");
const HTMLWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getCssLoaders = require("./loaders/cssLoaders");
const getTSLoader = require("./loaders/tsLoaders");
const getResourceLoaders = require("./loaders/resourceLoaders");

module.exports = (env) => {
  const { isProdEnv, isDevEnv } = env;

  const parentDirName = path.dirname(__dirname);

  return {
    entry: "./src/index.tsx",
    module: {
      rules: [
        ...getCssLoaders(isProdEnv),
        ...getTSLoader(),
        ...getResourceLoaders(),
      ],
    },
    plugins: [
      new HTMLWebPackPlugin({
        template: path.resolve(parentDirName, "public", "index.html"),
        inject: true,
        hash: true,
        filename: "index.html",
      }),
      new MiniCssExtractPlugin(),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
  };
};
