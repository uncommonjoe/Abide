import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	faHouse,
	faToolbox,
	faSliders,
} from '@fortawesome/free-solid-svg-icons';
import { createStackNavigator } from '@react-navigation/stack';

// Pages
import HomePage from '../src/pages/Home';
import SelectTrackModal from '../src/pages/users/SelectTrackModal';
import Toolbox from '../src/pages/Toolbox';
import Settings from '../src/pages/Settings';
import { TransitionPresets } from '@react-navigation/stack';

const HomeNav = createStackNavigator();
const BottomNavigation = createBottomTabNavigator();

var createHomeStack = () => (
	<HomeNav.Navigator
		presentation='modal'
		screenOptions={() => ({
			headerShown: false,
			cardOverlayEnabled: true,
			gestureEnabled: true,
		})}
	>
		<HomeNav.Screen
			name='Home'
			component={HomePage}
			options={{ headerShown: false }}
		/>
		<HomeNav.Screen
			name='SelectTrackScreen'
			component={SelectTrackModal}
			options={{
				animationEnabled: true,
				title: '',
				...TransitionPresets.ModalSlideFromBottomIOS,

				headerStyle: {
					backgroundColor: 'red',
					borderBottomWidth: 0,
				},
				headerTintColor: '#1A1B1D',
			}}
		/>
	</HomeNav.Navigator>
);

export default function UserStack() {
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
					name='Main'
					children={createHomeStack}
					options={{
						headerShown: false,
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
		</NavigationContainer>
	);
}
