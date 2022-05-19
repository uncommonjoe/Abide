import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	faHouse,
	faToolbox,
	faSliders,
} from '@fortawesome/free-solid-svg-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header';

// Pages
import HomePage from '../pages/Home';
import ReadScreen from '../pages/scriptures/ReadScreen';
import Toolbox from '../pages/Toolbox';
import Settings from '../pages/Settings';

const Home = createNativeStackNavigator();
const BottomNavigation = createBottomTabNavigator();

var homeStack = () => (
	<Home.Navigator
		screenOptions={() => ({
			gestureEnabled: true,
		})}
	>
		<Home.Screen
			name='Home'
			component={HomePage}
			options={{
				header: () => <Header />,
			}}
		/>
		<Home.Screen
			name='Read'
			component={ReadScreen}
			options={{
				header: () => <Header />,
			}}
		/>
	</Home.Navigator>
);

export default function UserStack() {
	return (
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
				name='Main'
				children={homeStack}
				options={{
					headerShown: false,
					hideTabBar: true,
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
					headerShown: false,
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
					headerShown: false,
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
	);
}
