import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../pages/Home';
import SignInScreen from '../pages/users/SignInScreen';
import SignUpScreen from '../pages/users/SignUpScreen';
import ForgotPasswordScreen from '../pages/users/ForgotPasswordScreen';
import EmailSentScreen from '../pages/users/EmailSentScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Sign In'
				component={SignInScreen}
				options={{
					header: () => null,
				}}
			/>
			<Stack.Screen
				name='Sign Up'
				component={SignUpScreen}
				options={{
					header: () => null,
				}}
			/>
			<Stack.Screen
				name='Forgot Password'
				component={ForgotPasswordScreen}
				options={{
					header: () => null,
				}}
			/>
			<Stack.Screen
				name='Email Sent'
				component={EmailSentScreen}
				options={{
					header: () => null,
				}}
			/>
			<Stack.Screen
				name='Home'
				component={HomeScreen}
				options={{
					header: () => null,
				}}
			/>
		</Stack.Navigator>
	);
}
