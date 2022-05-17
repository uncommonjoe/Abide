// // Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require('expo/metro-config');

// const config = getDefaultConfig(__dirname, {
// 	// Initialize in exotic mode.
// 	// If you want to preserve `react-native` resolver main field, and omit cjs support, then leave this undefined
// 	// and skip setting the `EXPO_USE_EXOTIC` environment variable.
// 	mode: 'exotic',
// });

// config.transformer.babelTransformerPath = require.resolve(
// 	'./metro-exotic-transformer'
// );

// // Optionally, you can add support for the `react-native` resolver field back
// // doing this will increase bundling time and size as many community packages ship untransformed code using this feature.
// // Other packages like `nanoid` use the field to support `react-native` so you may need to enable it regardless.
// // defaultConfig.resolver.resolverMainFields.unshift('react-native');

// module.exports = config;

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts = [
	...config.resolver.assetExts,
	'jsx',
	'json',
	'ts',
	'tsx',
	'cjs',
];

config.resolver.resolverMainFields.unshift('react-native');

// Remove all console logs in production...
config.transformer.minifierConfig.compress.drop_console = true;

module.exports = config;
