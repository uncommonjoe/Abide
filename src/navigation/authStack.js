import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../pages/Home';
import SignInScreen from '../pages/users/SignInScreen';
import SignOutScreen from '../pages/users/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Sign In' component={SignInScreen} />
			<Stack.Screen name='Sign Up' component={SignOutScreen} />
			<Stack.Screen name='Home' component={HomeScreen} />
		</Stack.Navigator>
	);
}
