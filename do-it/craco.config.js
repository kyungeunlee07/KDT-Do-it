const path = require("path");
const fs = require("fs");

const { whenDev } = require("@craco/craco");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) =>
          constructor && constructor.name === "ModuleScopePlugin"
      );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      webpackConfig["resolve"] = {
        fallback: {
          path: false,
          crypto: false,
          util: false,
          os: false,
          fs: false,
          zlib: false,
          buffer: false,
        },
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      };
      return webpackConfig;
    },
  },
  devServer: whenDev(() => ({
    https: true,
  })),
};