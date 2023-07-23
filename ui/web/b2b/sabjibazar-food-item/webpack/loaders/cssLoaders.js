const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cssLoader = { loader: "css-loader", options: { module: true } };

const getStyleLoader = (isProdEnv) => {
  return isProdEnv ? MiniCssExtractPlugin.loader : "style-loader";
};

function getCssLoaders(isProdEnv) {
  const styleLoader = getStyleLoader(isProdEnv);
  const baseLoader = [styleLoader, cssLoader];

  return [
    {
      test: /\.css$/,
      use: baseLoader,
    },
    {
      test: /\.s[ac]ss$/i,
      use: [...baseLoader, { loader: "sass-loader" }],
    },
  ];
}

module.exports = getCssLoaders;
