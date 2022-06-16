import { StyleSheet } from 'react-native';
// import {
// 	Montserrat_400Regular,
// 	Montserrat_500Medium,
// 	Montserrat_700Bold,
// } from '@expo-google-fonts/montserrat';

const input = StyleSheet.create({
	title: {
		//fontFamily: Montserrat_400Regular,
		fontSize: 14,
		color: '#454C57',
		marginTop: 10,
		marginBottom: 5,

		textTransform: 'uppercase',
	},
	text: {
		padding: 20,
		color: '#454C57',
		//fontFamily: Montserrat_500Medium,
		fontSize: 16,
		borderColor: 'transparent',
		borderWidth: 0,
		backgroundColor: 'white',
	},
	container: {
		marginBottom: 20,
	},
});

export default input;
