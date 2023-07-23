const webpackMerge = require("webpack-merge").merge;
const webpackCommon = require("./webpack.common");

const ENV_VS_NAME = {
  development: "dev",
  production: "prod",
};

module.exports = (env, argv) => {
  const { production: isProdEnv, development: isDevEnv } = env;

  const buildName = isProdEnv
    ? ENV_VS_NAME.production
    : ENV_VS_NAME.development;
  const commonConfig = webpackCommon({ isProdEnv, isDevEnv });
  const getWebpackEnvConfig = require(`./webpack.${buildName}`);
  const envConfig = getWebpackEnvConfig(isProdEnv);

  return webpackMerge(commonConfig, envConfig);
};
