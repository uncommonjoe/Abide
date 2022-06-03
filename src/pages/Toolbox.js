import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TitleText } from '../assets/styles/Text';
import page from '../assets/styles/page.style';

export default function Toolbox() {
	return (
		<View style={[page.container, { paddingTop: 70 }]}>
			<SafeAreaView>
				<StatusBar style='dark' />

				<TitleText>Toolbox</TitleText>
			</SafeAreaView>
		</View>
	);
}
