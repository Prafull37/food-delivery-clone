const path = require("path");

module.exports = (env) => {
  const parentDirName = path.dirname(__dirname);

  return {
    mode: "production",
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(parentDirName, "dist"),
      clean: true,
    },
  };
};
