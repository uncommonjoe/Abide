import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
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
import {
	getAuth,
	updateProfile,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { TitleText } from '../../assets/styles/Text';
import button from '../../assets/styles/button.style';
import input from '../../assets/styles/input.style';
import page from '../../assets/styles/page.style';
import NavService from '../../navigation/NavService';
import BackButton from '../../components/BackButton';

const SignUpScreen = () => {
	const [loading, setLoading] = useState(false);
	const auth = getAuth();
	const navigation = useNavigation();
	const windowSize = useWindowDimensions();

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
		setLoading(true);

		if (value.displayName.length < 3) {
			setLoading(false);
			setValue({
				...value,
				nameError: 'Name is required.',
			});
			return;
		}
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
			const { user } = await createUserWithEmailAndPassword(
				auth,
				value.email,
				value.password
			);
			const user2 = await updateProfile(user, {
				displayName: value.displayName,
			});

			setLoading(false);
			NavService.resetStack('TrackStack', { user2 });
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
				case 'auth/missing-password':
					setValue({
						...value,
						passwordError: 'Password is required.',
					});
					break;
				case 'auth/weak-password':
					setValue({
						...value,
						passwordError:
							'Password should be at least 6 characters.',
					});
					break;
				default:
					setValue({
						...value,
						error: 'Check to make sure all fields are valid',
					});
					console.warn(errorMessage);
			}
			setLoading(false);
			throw error;
		}
	};

	const updateName = (text) => {
		setValue({
			...value,
			displayName: text,
			nameError: '',
			error: '',
		});
	};

	const updateEmail = (text) => {
		setValue({
			...value,
			email: text,
			emailError: '',
			error: '',
		});
	};

	const updatePassword = (text) => {
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

				<BackButton style={{ marginVertical: 20 }} />

				<TitleText>Getting Started</TitleText>

				<View style={page.section}>
					<View style={input.container}>
						<Text style={input.title}>Full Name</Text>
						<TextInput
							style={input.text}
							value={value.displayName}
							onChangeText={(text) => updateName(text)}
							returnKeyType='next'
							returnKeyLabel='next'
							onSubmitEditing={signUp}
						/>
						{!!value.nameError && (
							<Text style={styles.error}>{value.nameError}</Text>
						)}
					</View>

					<View style={input.container}>
						<Text style={input.title}>Email</Text>
						<TextInput
							style={input.text}
							value={value.email}
							keyboardType='email-address'
							onChangeText={(text) => updateEmail(text)}
							returnKeyType='next'
							returnKeyLabel='next'
							onSubmitEditing={signUp}
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
							returnKeyType='next'
							returnKeyLabel='next'
							onSubmitEditing={signUp}
						/>

						{!!value.passwordError && (
							<Text style={styles.error}>
								{value.passwordError}
							</Text>
						)}
					</View>

					<TouchableOpacity
						style={[button.button, button.blue]}
						onPress={signUp}
						disabled={loading}
					>
						{loading ? (
							<ActivityIndicator size='small' color='#fff' />
						) : (
							<Text style={button.text}>Sign Up</Text>
						)}
					</TouchableOpacity>

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

export default SignUpScreen;
