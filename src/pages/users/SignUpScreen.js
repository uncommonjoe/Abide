import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUpScreen() {
	const auth = getAuth();

	const [value, setValue] = React.useState({
		email: '',
		password: '',
		error: '',
	});

	async function signUp() {
		if (value.email === '' || value.password === '') {
			setValue({
				...value,
				error: 'Email and password are mandatory.',
			});
			return;
		}

		try {
			await createUserWithEmailAndPassword(
				auth,
				value.email,
				value.password
			);
			navigation.navigate('Sign In');
		} catch (error) {
			setValue({
				...value,
				error: error.message,
			});
		}
	}

	return (
		<View>
			<StatusBar barStyle='light-content' />

			<View style={styles.container}>
				<Text>Sign Up</Text>
				{!!value.error && (
					<View style={styles.error}>
						<Text>{value.error}</Text>
					</View>
				)}

				<View style={styles.controls}>
					<TextInput
						placeholder='Email'
						containerStyle={styles.control}
						value={value.email}
						onChangeText={(text) =>
							setValue({ ...value, email: text })
						}
					/>

					<TextInput
						placeholder='Password'
						containerStyle={styles.control}
						value={value.password}
						onChangeText={(text) =>
							setValue({ ...value, password: text })
						}
						secureTextEntry={true}
					/>

					<Button
						title='Sign up'
						buttonStyle={styles.control}
						onPress={signUp}
					/>
				</View>
			</View>
		</View>
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
