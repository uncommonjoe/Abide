import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../src/pages/Home';
import WelcomeScreen from '../src/pages/users/WelcomeScreen';
import SignInScreen from '../src/pages/users/SignInScreen';
import SignOutScreen from '../src/pages/users/SignUpScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Welcome' component={WelcomeScreen} />
				<Stack.Screen name='Sign In' component={SignInScreen} />
				<Stack.Screen name='Sign Up' component={SignOutScreen} />
				<Stack.Screen name='Home' component={HomeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
