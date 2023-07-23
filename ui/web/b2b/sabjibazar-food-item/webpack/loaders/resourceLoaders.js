function getResourceLoaders() {
  return [
    {
      test: /\.(jpg|png|gif|svg)$/,
      type: "asset",
    },
  ];
}

module.exports = getResourceLoaders;
