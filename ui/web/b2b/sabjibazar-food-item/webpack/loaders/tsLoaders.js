function getTSLoader() {
  return [
    {
      test: /\.tsx?$/,
      use: ["ts-loader"],
      exclude: /node_modules/,
      resolve: {
        fullySpecified: false,
      },
    },
  ];
}

module.exports = getTSLoader;
