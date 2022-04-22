import React from 'react';
import { View, SafeAreaView, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../assets/styles/container.style';
import { TitleText, Text } from '../assets/styles/Text';
import { useAuthentication } from '../utils/hooks/useAuthentication';

const { user } = useAuthentication();

export default function Settings() {
	return (
		<View style={styles.container}>
			<StatusBar />

			<SafeAreaView>
				<View style={styles.page}>
					<TitleText style={{ marginBottom: 25 }}>
						Hello {user?.email}!
					</TitleText>

					<Button title='Sign Out' style={styles.button} />
				</View>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		marginTop: 10,
	},
});
