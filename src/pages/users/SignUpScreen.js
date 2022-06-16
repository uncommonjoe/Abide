import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	ActivityIndicator,
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

const SignUpScreen = () => {
	const [loading, setLoading] = useState(false);
	const auth = getAuth();
	const navigation = useNavigation();

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
		if (!value.displayName) {
			setLoading(false);
			setValue({
				...value,
				nameError: 'Name is required.',
			});
		}
		if (!value.email) {
			setLoading(false);
			setValue({
				...value,
				emailError: 'Email is required.',
			});
		}
		if (!value.password) {
			setLoading(false);
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
			const user2 = await updateProfile(user, {
				displayName: value.displayName,
			});
			setLoading(false);
			NavService.resetStack('TrackStack', { user2 });
		} catch (error) {
			setLoading(false);
			setValue({
				...value,
				error: error.message,
			});
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={page.container}>
				<StatusBar style='dark' />

				<TitleText style={{ marginTop: 40 }}>Getting Started</TitleText>

				<View style={page.section}>
					<View style={input.container}>
						<Text style={input.title}>Full Name</Text>
						<TextInput
							style={input.text}
							value={value.displayName}
							onChangeText={(text) =>
								setValue({ ...value, displayName: text })
							}
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
							onChangeText={(text) =>
								setValue({ ...value, email: text })
							}
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
							onChangeText={(text) =>
								setValue({ ...value, password: text })
							}
							secureTextEntry={true}
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
						<View style={styles.error}>
							<Text>{value.error}</Text>
						</View>
					)}
				</View>

				<View>
					<Text style={[input.title, { textAlign: 'center' }]}>
						Already have an account?
					</Text>
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
		marginTop: 5,
		color: 'red',
	},
});

export default SignUpScreen;
