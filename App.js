import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	faHouse,
	faToolbox,
	faSliders,
} from '@fortawesome/free-solid-svg-icons';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

//import { FontAwesome } from "@expo/vector-icons";

// Pages
import HomePage from './src/pages/Home';
import Toolbox from './src/pages/Toolbox';
import Settings from './src/pages/Settings';

const BottomNavigation = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<BottomNavigation.Navigator
				screenOptions={{
					tabBarStyle: {
						backgroundColor: 'white',
						borderTopWidth: 1,
						borderTopColor: '#F0F0F0',
						justifyContent: 'center',
						height: 85,
					},
				}}
			>
				<BottomNavigation.Screen
					name='Home'
					component={HomePage}
					options={{
						tabBarLabel: '',
						tabBarIcon: ({ color, size }) => (
							<FontAwesomeIcon
								icon={faHouse}
								color={color}
								size={size}
							/>
						),
					}}
				/>
				<BottomNavigation.Screen
					name='Toolbox'
					component={Toolbox}
					options={{
						tabBarLabel: '',
						tabBarIcon: ({ color, size }) => (
							<FontAwesomeIcon
								icon={faToolbox}
								color={color}
								size={size}
							/>
						),
					}}
				/>
				<BottomNavigation.Screen
					name='Settings'
					component={Settings}
					options={{
						tabBarLabel: '',
						tabBarIcon: ({ color, size }) => (
							<FontAwesomeIcon
								icon={faSliders}
								color={color}
								size={size}
							/>
						),
					}}
				/>
			</BottomNavigation.Navigator>
		</NavigationContainer>
	);
}
