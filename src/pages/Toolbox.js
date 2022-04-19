import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import styles from '../assets/styles/container.style';
import { TitleText, Text } from '../assets/styles/Text';

export default function Toolbox() {
	return (
		<View style={styles.container}>
			<StatusBar />

			<SafeAreaView>
				<View style={styles.page}>
					<TitleText style={{ marginBottom: 25 }}>Toolbox</TitleText>
				</View>
			</SafeAreaView>
		</View>
	);
}
