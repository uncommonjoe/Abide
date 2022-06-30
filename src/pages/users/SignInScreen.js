import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	ScrollView,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	ActivityIndicator,
	useWindowDimensions,
} from 'react-native';
import { TitleText } from '../../assets/styles/Text';
import button from '../../assets/styles/button.style';
import input from '../../assets/styles/input.style';
import page from '../../assets/styles/page.style';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import NavService from '../../navigation/NavService';
import { isEmpty } from 'lodash';
import userSettings from '../../utils/hooks/userSettings';

const SignInScreen = () => {
	const [loading, setLoading] = useState(false);
	const auth = getAuth();
	const [value, setValue] = useState({
		email: '',
		password: '',
		error: '',
		emailError: '',
		passwordError: '',
	});
	const navigation = useNavigation();
	const windowSize = useWindowDimensions();

	async function signIn() {
		setLoading(true);
		if (value.email.length < 4) {
			setLoading(false);
			setValue({
				...value,
				emailError: 'Email address is required.',
			});
			return;
		}

		if (value.password.length < 4) {
			setLoading(false);
			setValue({
				...value,
				passwordError: 'Password is required.',
			});
			return;
		}

		try {
			await signInWithEmailAndPassword(
				auth,
				value.email,
				value.password
			).then(({ user }) => {
				userSettings(user, (res) => {
					setLoading(false);
					global.usrSettngs = res;
					global.user = user;
					isEmpty(res)
						? NavService.resetStack('TrackStack', { user })
						: NavService.resetStack('UserStack', { user });
				});
			});
		} catch (error) {
			var errorCode = error.code;
			var errorMessage = error.message;

			if (errorCode === 'auth/user-not-found') {
				setValue({
					...value,
					error: 'Username or password was incorrect',
				});
			} else if (errorCode === 'auth/invalid-email') {
				setLoading(false);
				setValue({
					...value,
					emailError: 'Email address is invalid.',
				});
			} else {
				setValue({
					...value,
					error: errorMessage,
				});
			}

			console.warn('error', error);
			setLoading(false);
			throw error;
		}
	}

	const updateEmail = (text) => {
		// clear out error and update text
		setValue({
			...value,
			email: text,
			emailError: '',
			error: '',
		});
	};

	const updatePassword = (text) => {
		// clear out error and update text
		setValue({
			...value,
			password: text,
			passwordError: '',
			error: '',
		});
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<ScrollView
				style={[
					page.container,
					page.statusBarOffset,
					{ marginHorizontal: windowSize.width > 500 ? 200 : 0 },
				]}
			>
				<StatusBar style='dark' />

				<TitleText style={{ marginTop: 40 }}>Welcome Back</TitleText>

				<View style={page.section}>
					<View style={input.container}>
						<Text style={input.title}>Email</Text>
						<TextInput
							style={input.text}
							value={value.email}
							keyboardType='email-address'
							onChangeText={(text) => updateEmail(text)}
							returnKeyType='go'
							returnKeyLabel='go'
							onSubmitEditing={signIn}
						/>

						{!!value.emailError && (
							<Text style={styles.error}>{value.emailError}</Text>
						)}
					</View>

					<View style={input.container}>
						<Text style={input.title}>Password</Text>
						<TextInput
							style={input.text}
							value={value.password}
							onChangeText={(text) => updatePassword(text)}
							secureTextEntry={true}
							returnKeyType='go'
							returnKeyLabel='go'
							onSubmitEditing={signIn}
						/>

						{!!value.passwordError && (
							<Text style={styles.error}>
								{value.passwordError}
							</Text>
						)}
					</View>

					<TouchableOpacity
						style={[button.button, button.blue]}
						onPress={signIn}
					>
						{loading ? (
							<ActivityIndicator size='small' color='#fff' />
						) : (
							<Text style={button.text}>Sign in</Text>
						)}
					</TouchableOpacity>

					{!!value.error && (
						<Text style={styles.error}>{value.error}</Text>
					)}

					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							marginTop: 10,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<TouchableOpacity
							style={[button.link]}
							onPress={() =>
								navigation.navigate('Forgot Password')
							}
						>
							<Text style={button.linkText}>Forgot password</Text>
						</TouchableOpacity>

						<Text>|</Text>

						<TouchableOpacity
							style={button.link}
							onPress={() => navigation.navigate('Sign Up')}
						>
							<Text style={button.linkText}>Register</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	error: {
		marginTop: 15,
		color: '#802119',
		fontSize: 16,
	},
});

export default SignInScreen;
