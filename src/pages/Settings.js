import React from 'react';
import { View, SafeAreaView, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TitleText, Text } from '../assets/styles/Text';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { signOut, getAuth } from 'firebase/auth';

export default function Settings() {
	const { user } = useAuthentication();
	const auth = getAuth();

	return (
		<View>
			<StatusBar />

			<SafeAreaView>
				<View>
					<TitleText style={{ marginBottom: 25 }}>
						Hello {user?.displayName}
					</TitleText>

					<Button title='Sign Out' onPress={() => signOut(auth)} />
				</View>
			</SafeAreaView>
		</View>
	);
}
