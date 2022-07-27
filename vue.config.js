module.exports = {
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "BondiLineas";
      return args;
    });
  },
  publicPath: process.env.NODE_ENV === 'production'
  ? '/bsas-transit-front/'
  : '/'
};
