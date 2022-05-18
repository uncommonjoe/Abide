import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, TitleText } from '../assets/styles/Text';
import { useNavigation } from '@react-navigation/native';

const Header = ({}) => {
	const [isLoading, setLoading] = useState(true);
	const [currentWeek, setCurrentWeek] = useState(null);

	useEffect(async () => {}, []);

	return (
		<View style={styles.header}>
			<Text style={styles.title}>Header</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#F3F2F8',
		height: '100%',
		width: '100%',
		padding: 20,
	},
	title: {
		color: '#454C57',
		fontWeight: 800,
		fontFamily: 'Montserrat',
		fontSize: 24,
	},
	button: {
		flex: 1,
		flexDirection: 'row',
		flexGrow: 1,
		backgroundColor: 'white',
		marginHorizontal: 10,
		marginBottom: 6,
		paddingHorizontal: 15,
		paddingVertical: 6,
	},
});

export default Header;
