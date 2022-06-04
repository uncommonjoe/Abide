import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import page from '../../assets/styles/page.style';
import { TitleText } from '../../assets/styles/Text';

const ToolboxModal = (item) => {
	const [payload, setPayload] = useState(item.route.params.item);

	const backgroundStyle = (color) => {
		// Need to convert color with convertColor hook
		switch (color) {
			case 'red':
				return { backgroundColor: '#802119' };
			case 'blue':
				return { backgroundColor: '#434D59' };
			case 'green':
				return { backgroundColor: '#556D54' };
			case 'brown':
				return { backgroundColor: '#746756' };
			case 'tan':
				return { backgroundColor: '#C1A98B' };
		}
	};

	useEffect(() => {
		setPayload(item.route.params.item);
	}, [item]);

	return (
		<ScrollView
			style={[page.container, backgroundStyle(payload.color)]}
			contentInsetAdjustmentBehavior='automatic'
		>
			<SafeAreaView>
				<TitleText style={[styles.white, styles.title]}>
					{payload.title}
				</TitleText>

				<Text style={styles.white}>{payload.description}</Text>
			</SafeAreaView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
	},
	white: {
		color: 'white',
	},
});

export default ToolboxModal;
