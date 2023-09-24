import React from 'react';
import './src/config/firebase';
import RootNavigation from './src/navigation';
import { NavigationContainer } from '@react-navigation/native';
import NavService from './src/navigation/NavService';
import { Store } from './src/redux';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Provider store={Store}>
				<NavigationContainer
					ref={(ref) => NavService.setTopLevelNavigator(ref)}
				>
					<RootNavigation />
				</NavigationContainer>
			</Provider>
		</GestureHandlerRootView>
	);
}
