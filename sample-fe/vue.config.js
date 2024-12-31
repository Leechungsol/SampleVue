module.exports = {
  productionSourceMap: false,
  pages: {
    index: {
      entry: "src/main.js",
      title: "SeoYeonManager",
    },
  },
  devServer: {
    allowedHosts: "all",
    client: {
      overlay: false,
    },
  },
};
