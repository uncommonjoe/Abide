import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
	const auth = getAuth();
	const [value, setValue] = React.useState({
		email: '',
		password: '',
		error: '',
	});
	const navigation = useNavigation();

	async function signIn() {
		if (value.email === '' || value.password === '') {
			setValue({
				...value,
				error: 'Email and password are mandatory.',
			});
			return;
		}
		try {
			await signInWithEmailAndPassword(
				auth,
				value.email,
				value.password
			).then((user) => {
				//once we are logged in, we move to the home screen
				navigation.navigate('Home', { user });
			});
		} catch (error) {
			setValue({
				...value,
				error: error.message,
			});
		}
	}

	return (
		<View style={styles.container}>
			<Text>Signin screen!</Text>

			{!!value.error && (
				<View style={styles.error}>
					<Text>{value.error}</Text>
				</View>
			)}

			<View style={styles.controls}>
				<TextInput
					placeholder='Email'
					style={styles.control}
					value={value.email}
					onChangeText={(text) => setValue({ ...value, email: text })}
				/>

				<TextInput
					placeholder='Password'
					style={styles.control}
					value={value.password}
					onChangeText={(text) =>
						setValue({ ...value, password: text })
					}
					secureTextEntry={true}
				/>

				<Button
					title='Sign in'
					buttonStyle={styles.control}
					onPress={signIn}
				/>
			</View>

			<View style={styles.container}>
				<Button
					title='Register'
					type='outline'
					buttonStyle={styles.button}
					onPress={() => navigation.navigate('Sign Up')}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},

	controls: {
		flex: 1,
	},

	input: {
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 5,
	},

	title: {
		marginTop: 10,
	},

	error: {
		marginTop: 5,
		color: 'red',
	},
});

export default SignInScreen;
