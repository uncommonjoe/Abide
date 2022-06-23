// module.exports = {
//     transformer: {
//       getTransformOptions: async () => ({
//         transform: {
//           experimentalImportSupport: false,
//           inlineRequires: true,
//         },
//       }),
//     },
//     resolver: {
//       sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs'],
//     },
//   };

const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
	const config = await getDefaultConfig(__dirname);

	const { transformer, resolver } = config;

	config.resolver = {
		...resolver,
		assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
		sourceExts: [...resolver.sourceExts, 'jsx', 'js', 'ts', 'tsx', 'cjs'],
	};

	return config;
})();
