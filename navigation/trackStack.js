import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../src/pages/Home';
import SelectTrackModal from '../src/pages/users/SelectTrackModal';

const Stack = createStackNavigator();

export default function AuthStack() {
	return (
		<NavigationContainer>
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
				<Stack.Screen name='Home' component={HomeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
