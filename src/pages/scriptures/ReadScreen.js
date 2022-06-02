import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import Scripture from '../../components/Scripture';
import page from '../../assets/styles/page.style';

const ReadScreen = ({ route }) => {
	const readingObj = route.params.reading;

	return (
		<ScrollView
			style={[page.container, styles.background]}
			contentInsetAdjustmentBehavior='automatic'
		>
			<SafeAreaView>
				<Scripture reading={readingObj} />
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
