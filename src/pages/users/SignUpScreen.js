import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {
	getAuth,
	updateProfile,
	createUserWithEmailAndPassword,
} from 'firebase/auth';

const SignUpScreen = () => {
	const auth = getAuth();

	const [value, setValue] = React.useState({
		displayName: '',
		email: '',
		password: '',
		error: '',
		nameError: '',
		emailError: '',
		passwordError: '',
	});

	const signUp = async () => {
		if (!value.displayName) {
			setValue({
				...value,
				nameError: 'Name is required.',
			});
		}
		if (!value.email) {
			setValue({
				...value,
				emailError: 'Email is required.',
			});
		}
		if (!value.password) {
			setValue({
				...value,
				passwordError: 'Password is required.',
			});
		}

		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				value.email,
				value.password
			);
			await updateProfile(user, {
				displayName: value.displayName,
			});
		} catch (error) {
			setValue({
				...value,
				error: error.message,
			});
		}
	};

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
					<Text style={styles.title}>Name</Text>
					<TextInput
						style={styles.input}
						value={value.displayName}
						onChangeText={(text) =>
							setValue({ ...value, displayName: text })
						}
					/>
					{!!value.nameError && (
						<Text style={styles.error}>{value.nameError}</Text>
					)}

					<Text style={styles.title}>Email</Text>
					<TextInput
						style={styles.input}
						value={value.email}
						onChangeText={(text) =>
							setValue({ ...value, email: text })
						}
					/>
					{!!value.emailError && (
						<Text style={styles.error}>{value.emailError}</Text>
					)}

					<Text style={styles.title}>Password</Text>
					<TextInput
						style={styles.input}
						value={value.password}
						onChangeText={(text) =>
							setValue({ ...value, password: text })
						}
						secureTextEntry={true}
					/>
					{!!value.passwordError && (
						<Text style={styles.error}>{value.passwordError}</Text>
					)}

					<Button
						title='Sign up'
						buttonStyle={styles.control}
						onPress={signUp}
					/>
				</View>
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

export default SignUpScreen;
