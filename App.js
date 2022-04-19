import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Pages
import HomePage from './src/screens/Home';

const BottomNavigation = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<BottomNavigation.Navigator
				tabBarOptions={{
					activeTintColor: '#0C7B93',
					inactiveTintColor: 'rgba(26,27,29, .4)',
					style: {
						backgroundColor: 'white',
						borderTopWidth: 1,
						borderTopColor: '#F0F0F0',
						justifyContent: 'center',
						height: 85,
					},
				}}
				screenOptions={({ route }) => ({
					tabBarIcon: ({ color, size }) => {
						if (route.name === 'Home') {
							return (
								<FontAwesomeIcon
									icon='fa-light fa-house-blank'
									color={color}
									size={size}
								/>
							);
						} else if (route.name === 'Toolbox') {
							return (
								<FontAwesomeIcon
									icon='fa-light fa-toolbox'
									color={color}
									size={size}
								/>
							);
						}

						return (
							<FontAwesomeIcon
								icon='fa-light fa-sliders'
								color={color}
								size={size}
							/>
						);
					},
				})}
			>
				<BottomNavigation.Screen name='Home' component={HomePage} />
				<BottomNavigation.Screen name='Toolbox' component={Toolbox} />
				<BottomNavigation.Screen name='Settings' component={Settings} />
			</BottomNavigation.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
