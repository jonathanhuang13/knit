module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@hooks': './src/hooks',
            '@utils': './src/utils',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@external': './src/external',
            '@graphql': './src/graphql',
            '@components': './src/components',
          },
          extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.json', '.tsx', '.ts', '.native.js'],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
