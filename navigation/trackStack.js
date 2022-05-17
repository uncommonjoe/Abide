import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../src/pages/Home';
import SelectTrackModal from '../src/pages/users/SelectTrackModal';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='SelectTrackScreen'
				component={SelectTrackModal}
				options={{
					animationEnabled: true,
					title: '',
					...TransitionPresets.DefaultTransition,
				}}
			/>
		</Stack.Navigator>
	);
}
