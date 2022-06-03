import React from 'react';
import { View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TitleText } from '../assets/styles/Text';
import button from '../assets/styles/button.style';
import page from '../assets/styles/page.style';
import useAuthentication from '../utils/hooks/useAuthentication';
import { signOut, getAuth } from 'firebase/auth';

export default function Settings() {
	const { user } = useAuthentication();
	const auth = getAuth();

	return (
		<View style={[page.container, { paddingTop: 70 }]}>
			<SafeAreaView>
				<StatusBar style='dark' />

				<TitleText>Hello {user?.displayName}</TitleText>

				<View style={page.section}>
					<TouchableOpacity
						style={[button.button, button.green]}
						onPress={() => signOut(auth)}
					>
						<Text style={[button.text, { color: 'white' }]}>
							Sign Out
						</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</View>
	);
}
