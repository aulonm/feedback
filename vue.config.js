function enableShadowCss(config) {
  const configs = [
    config.module.rule('vue').use('vue-loader'),
    config.module.rule('css').oneOf('vue-modules').use('vue-style-loader'),
    config.module.rule('css').oneOf('vue').use('vue-style-loader'),
    config.module.rule('css').oneOf('normal-modules').use('vue-style-loader'),
    config.module.rule('css').oneOf('normal').use('vue-style-loader'),
    config.module.rule('postcss').oneOf('vue-modules').use('vue-style-loader'),
    config.module.rule('postcss').oneOf('vue').use('vue-style-loader'),
    config.module.rule('postcss').oneOf('normal-modules').use('vue-style-loader'),
    config.module.rule('postcss').oneOf('normal').use('vue-style-loader'),
    config.module.rule('scss').oneOf('vue-modules').use('vue-style-loader'),
    config.module.rule('scss').oneOf('vue').use('vue-style-loader'),
    config.module.rule('scss').oneOf('normal-modules').use('vue-style-loader'),
    config.module.rule('scss').oneOf('normal').use('vue-style-loader'),
    config.module.rule('sass').oneOf('vue-modules').use('vue-style-loader'),
    config.module.rule('sass').oneOf('vue').use('vue-style-loader'),
    config.module.rule('sass').oneOf('normal-modules').use('vue-style-loader'),
    config.module.rule('sass').oneOf('normal').use('vue-style-loader'),
    config.module.rule('less').oneOf('vue-modules').use('vue-style-loader'),
    config.module.rule('less').oneOf('vue').use('vue-style-loader'),
    config.module.rule('less').oneOf('normal-modules').use('vue-style-loader'),
    config.module.rule('less').oneOf('normal').use('vue-style-loader'),
    config.module.rule('stylus').oneOf('vue-modules').use('vue-style-loader'),
    config.module.rule('stylus').oneOf('vue').use('vue-style-loader'),
    config.module.rule('stylus').oneOf('normal-modules').use('vue-style-loader'),
    config.module.rule('stylus').oneOf('normal').use('vue-style-loader'),
  ];
  configs.forEach((c) =>
    c.tap((options) => {
      // eslint-disable-next-line no-param-reassign
      options.shadowMode = true;
      return options;
    })
  );
}

module.exports = {
  css: {
    extract: false,
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV !== 'development') {
      enableShadowCss(config);
    }

    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule.use('babel-loader').loader('babel-loader').end().use('vue-svg-loader').loader('vue-svg-loader');
  },
};
