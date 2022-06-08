import React from 'react';
import './src/config/firebase';
import RootNavigation from './src/navigation';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import NavService from './src/navigation/NavService';

export default function App() {
	return (
		<NavigationContainer ref= {ref => NavService.setTopLevelNavigator(ref)}>
			<RootNavigation />
		</NavigationContainer>
	);
}
