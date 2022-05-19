import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import Scripture from '../../components/Scripture';

const ReadScreen = ({ route }) => {
	const readingObj = route.params.reading;

	return (
		<ScrollView
			style={styles.container}
			contentInsetAdjustmentBehavior='automatic'
		>
			<SafeAreaView>
				<Scripture reading={readingObj} />
			</SafeAreaView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: 'white',
	},
});

export default ReadScreen;
