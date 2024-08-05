const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  resolve: {
    fallback: {
      "fs": false,
      "stream": require.resolve("stream-browserify"),
      "zlib": require.resolve("browseri-zlib")
    }
  },
  plugins: [
    new NodePolyfillPlugin()
  ]
};