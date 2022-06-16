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
import { TitleText } from '../../assets/styles/Text';
import button from '../../assets/styles/button.style';
import input from '../../assets/styles/input.style';
import page from '../../assets/styles/page.style';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import NavService from '../../navigation/NavService';
import { isEmpty } from 'lodash';
import userSettings from '../../utils/hooks/userSettings';

const ForgotPasswordScreen = () => {
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

	const resetPassword = () => {
		console.warn('here');
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={page.container}>
				<StatusBar style='dark' />

				<TitleText style={{ marginTop: 40 }}>Forgot Password</TitleText>

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
