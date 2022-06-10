import React from 'react';
import './src/config/firebase';
import RootNavigation from './src/navigation';
import { NavigationContainer } from '@react-navigation/native';
import NavService from './src/navigation/NavService';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheetModalProvider from '@gorhom/bottom-sheet';

export default function App() {
	return (
		<GestureHandlerRootView
			ureHandlerRootView
			style={{ flex: 1 }}
			disallowInterruption
		>
			<BottomSheetModalProvider>
				<NavigationContainer
					ref={(ref) => NavService.setTopLevelNavigator(ref)}
				>
					<RootNavigation />
				</NavigationContainer>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
