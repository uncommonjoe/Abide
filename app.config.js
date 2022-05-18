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
			bundleIdentifier: 'org.cornerstonebillings.abide',
			googleServicesFile: './src/config/GoogleService-Info.plist',
		},
		android: {
			package: 'org.cornerstonebillings.abide',
			googleServicesFile: './src/config/google-services.json',
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
