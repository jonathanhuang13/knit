// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// defaultConfig.resolver.assetExts.push('cjs'); // Makes firebase work
defaultConfig.resolver.sourceExts.push('cjs'); // Makes apollo client work

module.exports = defaultConfig;
