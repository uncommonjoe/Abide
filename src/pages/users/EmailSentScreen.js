import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TitleText, Text } from '../../assets/styles/Text';
import button from '../../assets/styles/button.style';
import input from '../../assets/styles/input.style';
import page from '../../assets/styles/page.style';
import { useNavigation } from '@react-navigation/native';

const EmailSentScreen = () => {
	const navigation = useNavigation();

	return (
		<View style={[page.container, page.statusBarOffset]}>
			<StatusBar style='dark' />

			<TitleText style={{ marginTop: 40 }}>Check your mail</TitleText>

			<View style={page.section}>
				<View style={input.container}>
					<Text style={{ marginBottom: 20 }}>
						We have sent password recover instructions to your
						email.
					</Text>

					<TouchableOpacity
						style={[button.button, button.green]}
						onPress={() => navigation.navigate('Sign In')}
					>
						<Text style={button.text}>Back to Sign In</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View>
				<Text style={[input.title, { textAlign: 'center' }]}>
					Didn't receive the email? Check your spam filter or&nbsp;
					<Text
						style={[
							input.title,
							{ textDecorationLine: 'underline' },
						]}
						onPress={() => navigation.navigate('Forgot Password')}
					>
						try again
					</Text>
				</Text>
			</View>
		</View>
	);
};

export default EmailSentScreen;
