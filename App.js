import React from 'react';
import './src/config/firebase';
import RootNavigation from './src/navigation';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
	return (
		<NavigationContainer>
			<RootNavigation />
		</NavigationContainer>
	);
}
