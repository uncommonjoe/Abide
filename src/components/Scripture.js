import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TitleText } from '../assets/styles/Text';

const Scripture = ({ reading }) => {
	const [isLoading, setLoading] = useState(true);
	console.log(reading);

	return (
		<View>
			<Text>Scripture</Text>
			<Text>{reading.passage}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		//flex: 1,
		backgroundColor: 'lightgray',
		padding: 20,
	},
});

export default Scripture;
