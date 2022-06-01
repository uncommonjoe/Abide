import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../pages/Home';
import SelectTrackScreen from '../pages/users/SelectTrackScreen';

const Stack = createNativeStackNavigator();

export default function TrackStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='SelectTrackScreen'
				component={SelectTrackScreen}
				options={{
					header: () => null,
				}}
			/>
			<Stack.Screen
				name='Home'
				component={HomePage}
				options={{
					header: () => null,
				}}
			/>
		</Stack.Navigator>
	);
}
