const versionNumber = '1.2.b6110d';
const versionCode = 9; // Must be an integer and needs updated each time

export default {
	expo: {
		name: 'abide',
		slug: 'abide',
		version: versionNumber,
		runtimeVersion: versionNumber,
		orientation: 'portrait',
		icon: './src/assets/img/icon.png',
		splash: {
			image: './src/assets/img/splash.png',
			tabletImage: './src/assets/img//splash-tablet.png',
			resizeMode: 'cover',
			backgroundColor: '#ffffff',
		},
		updates: {
			url: 'https://u.expo.dev/897e4e07-a74f-47ad-bdf9-a3557021abfc',
			useClassicUpdates: true,
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
			versionCode: versionCode,
			versionName: versionNumber,
			package: 'org.cornerstonebillings.abide',
			googleServicesFile:
				process.env.GOOGLE_SERVICES_FILE ||
				'./src/config/google-services.json',
			adaptiveIcon: {
				foregroundImage: './src/assets/img/adaptive-icon.png',
				backgroundColor: '#434a57',
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

		plugins: [
			[
				'expo-build-properties',
				{
					android: {
						compileSdkVersion: 33,
						targetSdkVersion: 33,
						buildToolsVersion: '33.0.0',
					},
				},
			],
			'./plugins/withAndroidNamespace',
		],
	},
};
