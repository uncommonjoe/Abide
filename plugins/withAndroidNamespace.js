import {
	withAppBuildGradle,
	withMainApplication,
	createRunOncePlugin,
} from '@expo/config-plugins';

/**
 * This plugin is a temporary fix that is needed to fix Android builds on Expo 48.
 * There are two main issues:
 * 1. The namespace in android/app/build.gradle needs to match
 * the application id (like com.app.env), but it is set incorrectly
 * 2. The folder structure and package name in android/app/src/release/com/XXX/ReactNativeFlipper.java
 * is not created correctly
 */
const withAndroidExpoFix = (config) => {
	// Fix the namespace in android/app/build.gradle
	config = withAppBuildGradle(config, (config) => {
		const buildGradle = config.modResults.contents;
		const namespace = config?.android?.package?.toString?.();
		const newContents = buildGradle.replace(
			/namespace (.*)\n/,
			`namespace '${namespace}'\n`
		);
		config.modResults.contents = newContents;
		console.log(
			`[withAndroidExpoFix] Change build.gradle namespace to ${namespace}`
		);

		return config;
	});

	// Remove ReactNativeFlipper
	config = withMainApplication(config, async (config) => {
		const mainApplication = config.modResults.contents;
		const newContents = mainApplication?.replace(
			'ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());',
			''
		);
		config.modResults.contents = newContents;
		console.log(`[withAndroidExpoFix] Remove ReactNativeFlipper`);

		return config;
	});

	return config;
};

export default createRunOncePlugin(
	withAndroidExpoFix,
	'withAndroidExpoFix',
	'1.0.0'
);
