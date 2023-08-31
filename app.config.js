export default {
	expo: {
		name: 'abide',
		slug: 'abide',
		version: '1.2.0',
		orientation: 'portrait',
		icon: './src/assets/img/icon.png',
		splash: {
			image: './src/assets/img/splash.png',
			tabletImage: './src/assets/img//splash-tablet.png',
			resizeMode: 'cover',
			backgroundColor: '#ffffff',
		},
		updates: {
			fallbackToCacheTimeout: 30000,
		},
		assetBundlePatterns: ['**/*'],
		ios: {
			supportsTablet: true,
			bundleIdentifier: 'org.cornerstonebillings.abide',
			googleServicesFile: './src/config/GoogleService-Info.plist',
			infoPlist: {
				UIBackgroundModes: ['audio'],
			},
		},
		android: {
			versionCode: 3, // Must be an integer and needs updated each time
			versionName: '1.2.0',
			compileSdkVersion: 33,
			targetSdkVersion: 33,
			buildToolsVersion: '33.0.0',
			package: 'org.cornerstonebillings.abide',
			googleServicesFile:
				process.env.GOOGLE_SERVICES_FILE ||
				'./src/config/google-services.json',
			adaptiveIcon: {
				foregroundImage: './src/assets/img/adaptive-icon.png',
				backgroundColor: '#FFFFFF',
			},
		},
		web: {
			favicon: './src/assets/img/favicon.png',
		},
		extra: {
			eas: {
				projectId: '897e4e07-a74f-47ad-bdf9-a3557021abfc',
			},
		},
	},
};
