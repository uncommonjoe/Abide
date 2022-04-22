import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
	const navigation = useNavigation();

	return (
		<View>
			<StatusBar barStyle='light-content' />

			<View style={styles.container}>
				<Text>Welcome screen!</Text>

				<View style={styles.buttons}>
					<Button
						title='Sign in'
						buttonStyle={styles.button}
						onPress={() => navigation.navigate('Sign In')}
					/>
					<Button
						title='Sign up'
						type='outline'
						buttonStyle={styles.button}
						onPress={() => navigation.navigate('Sign Up')}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},

	buttons: {
		flex: 1,
	},

	button: {
		marginTop: 10,
	},
});
