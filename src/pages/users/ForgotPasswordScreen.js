import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	TextInput,
	ScrollView,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	ActivityIndicator,
	useWindowDimensions,
} from 'react-native';

import { TitleText, Text } from '../../assets/styles/Text';
import button from '../../assets/styles/button.style';
import input from '../../assets/styles/input.style';
import page from '../../assets/styles/page.style';
import BackButton from '../../components/BackButton';
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
	const windowSize = useWindowDimensions();

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
			<ScrollView
				style={[
					page.container,
					page.statusBarOffset,
					{ marginHorizontal: windowSize.width > 500 ? 200 : 0 },
				]}
			>
				<StatusBar style='dark' />

				<BackButton style={{ marginVertical: 20 }} />

				<TitleText>Forgot Password</TitleText>

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
							returnKeyType='go'
							returnKeyLabel='go'
							onSubmitEditing={resetPassword}
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

					<Text style={{ marginTop: 20 }}>
						If you don't receive an email within 10 minutes, please
						check your spam folder.
					</Text>

					{!!value.error && (
						<Text style={styles.error}>{value.error}</Text>
					)}
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

export default ForgotPasswordScreen;
