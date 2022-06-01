import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { TitleText } from '../../assets/styles/Text';
import button from '../../assets/styles/button.style';
import input from '../../assets/styles/input.style';
import page from '../../assets/styles/page.style';
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
		<View style={page.container}>
			<TitleText style={{ marginBottom: 20, marginTop: 40 }}>
				Welcome Back
			</TitleText>

			{!!value.error && (
				<View style={styles.error}>
					<Text>{value.error}</Text>
				</View>
			)}

			<View style={page.section}>
				<View style={input.container}>
					<Text style={input.title}>Email</Text>
					<TextInput
						style={input.text}
						value={value.email}
						onChangeText={(text) =>
							setValue({ ...value, email: text })
						}
					/>
				</View>

				<View style={input.container}>
					<Text style={input.title}>Password</Text>
					<TextInput
						style={input.text}
						value={value.password}
						onChangeText={(text) =>
							setValue({ ...value, password: text })
						}
						secureTextEntry={true}
					/>
				</View>

				<TouchableOpacity
					style={[button.button, button.blue]}
					onPress={signIn}
				>
					<Text style={button.text}>Sign in</Text>
				</TouchableOpacity>
			</View>

			<View>
				<Text style={input.title}>Don't have an account yet?</Text>
				<TouchableOpacity
					style={[button.button, button.green]}
					onPress={() => navigation.navigate('Sign Up')}
				>
					<Text style={button.text}>Register</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	error: {
		marginTop: 5,
		color: 'red',
	},
});

export default SignInScreen;
