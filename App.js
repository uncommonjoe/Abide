import React from 'react';
import './src/config/firebase';
import RootNavigation from './src/navigation';
import 'react-native-gesture-handler';
import { AppRegistry, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

AppRegistry.registerComponent('main', () => App);

export default function App() {
	return (
		<NavigationContainer>
			<RootNavigation />
		</NavigationContainer>
	);
}
