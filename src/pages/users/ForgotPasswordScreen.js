import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	ActivityIndicator,
} from 'react-native';

import { TitleText, Text } from '../../assets/styles/Text';
import button from '../../assets/styles/button.style';
import input from '../../assets/styles/input.style';
import page from '../../assets/styles/page.style';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
	const [loading, setLoading] = useState(false);
	const auth = getAuth();
	const [value, setValue] = useState({
		email: '',
		emailError: '',
	});

	const navigation = useNavigation();

	const resetPassword = async () => {
		setLoading(true);

		try {
			await sendPasswordResetEmail(auth, value.email);
			setLoading(false);
			navigation.navigate('Email Sent');
		} catch (error) {
			var errorCode = error.code;
			var errorMessage = error.message;

			switch (errorCode) {
				case 'auth/missing-email':
					setValue({
						...value,
						emailError: 'Email is required.',
					});
					break;
				case 'auth/invalid-email':
					setValue({
						...value,
						emailError: 'Please enter valid email address.',
					});
					break;
				case 'auth/user-not-found':
					setValue({
						...value,
						emailError: 'No such user exists with that email.',
					});
					break;

				default:
					setValue({
						...value,
						emailError: errorMessage,
					});
					console.warn(errorMessage);
			}
			setLoading(false);
			throw error;
		}
	};

	const updateEmail = (text) => {
		setValue({
			...value,
			email: text,
			emailError: '',
		});
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={[page.container, page.statusBarOffset]}>
				<StatusBar style='dark' />

				<TitleText style={{ marginTop: 40 }}>Forgot Password</TitleText>

				<Text style={{ marginBottom: 20 }}>
					Enter the email associated with your account and we'll send
					an email with instructions to reset your password
				</Text>

				<View style={page.section}>
					<View style={input.container}>
						<Text style={input.title}>Email</Text>
						<TextInput
							style={input.text}
							value={value.email}
							keyboardType='email-address'
							onChangeText={(text) => updateEmail(text)}
						/>

						{!!value.emailError && (
							<Text style={styles.error}>{value.emailError}</Text>
						)}
					</View>

					<TouchableOpacity
						style={[button.button, button.blue]}
						onPress={resetPassword}
					>
						{loading ? (
							<ActivityIndicator size='small' color='#fff' />
						) : (
							<Text style={button.text}>Reset Password</Text>
						)}
					</TouchableOpacity>

					{!!value.error && (
						<Text style={styles.error}>{value.error}</Text>
					)}
				</View>

				<View>
					<TouchableOpacity
						style={[button.button, button.green]}
						onPress={() => navigation.navigate('Sign In')}
					>
						<Text style={button.text}>Back to Sign In</Text>
					</TouchableOpacity>
				</View>
			</View>
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

export default ForgotPasswordScreen;
