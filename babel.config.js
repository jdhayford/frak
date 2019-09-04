module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        targets: {
          chrome: '59',
        },
        corejs: {
          version: 3,
          proposals: true,
        },
      },
    ],
    '@babel/preset-react',
  ];

  const plugins = [
    [
      'babel-plugin-styled-components',
      {
        fileName: false,
        minify: false,
      },
    ],
    '@babel/plugin-proposal-object-rest-spread',
  ];

  return {
    presets,
    plugins,
  };
};
