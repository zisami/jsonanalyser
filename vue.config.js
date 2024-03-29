const path = require("path");

module.exports = {
  publicPath: "",
  pwa: {
    name: 'JSON Analyser',
    themeColor: '#ffcc00',
    msTileColor: '#ffcc00',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
  },
 
  pluginOptions: {
    compression: {
      gzip: {
        filename: "[path].gz[query]",
        algorithm: "gzip",
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        minRatio: 0.8,
      },
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          include: path.resolve("node_modules", "jsoneditor/dist/jsoneditor.min.js"),
          sideEffects: false,
        },
      ],
    },
  },
};
 