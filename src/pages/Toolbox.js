import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { TitleText } from '../assets/styles/Text';
import page from '../assets/styles/page.style';

export default function Toolbox() {
	return (
		<SafeAreaView>
			<View style={page.container}>
				<TitleText style={{ marginBottom: 25 }}>Toolbox</TitleText>
			</View>
		</SafeAreaView>
	);
}
