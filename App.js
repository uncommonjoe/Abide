import React from 'react';
import './src/config/firebase';
import RootNavigation from './src/navigation';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
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
				<NavigationContainer>
					<RootNavigation />
				</NavigationContainer>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
