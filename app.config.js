import 'dotenv/config';

export default {
	expo: {
		name: 'abide',
		slug: 'abide',
		version: '1.0.0',
		orientation: 'portrait',
		icon: './src/assets/img/icon.png',
		splash: {
			image: './src/assets/img/splash.png',
			resizeMode: 'contain',
			backgroundColor: '#ffffff',
		},
		updates: {
			fallbackToCacheTimeout: 0,
		},
		assetBundlePatterns: ['**/*'],
		ios: {
			supportsTablet: true,
		},
		android: {
			adaptiveIcon: {
				foregroundImage: './src/assets/img/adaptive-icon.png',
				backgroundColor: '#FFFFFF',
			},
		},
		web: {
			favicon: './src/assets/img/favicon.png',
		},
	},
};
