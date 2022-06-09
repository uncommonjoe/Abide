import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Scripture from '../../components/Scripture';
import page from '../../assets/styles/page.style';

const ReadScreen = ({ route, title }) => {
	const readingObj = route.params.reading;

	return (
		<ScrollView
			style={[page.container1, styles.background]}
			contentInsetAdjustmentBehavior='automatic'
		>
			<SafeAreaView>
				<StatusBar style='dark' />

				<Scripture reading={readingObj} userName={title.passage} />
			</SafeAreaView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	background: {
		backgroundColor: 'white',
	},
});

export default ReadScreen;
