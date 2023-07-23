const path = require("path");

module.exports = (env) => {
  const parentDirName = path.dirname(__dirname);
  return {
    mode: "development",
    output: {
      filename: "[name].js",
      path: path.resolve(parentDirName, "dist"),
      clean: true,
    },
    devServer: {
      open: true,
      port: 4001,
      static: "./build/",
    },
  };
};
