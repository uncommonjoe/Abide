import { StyleSheet } from 'react-native';
import { Montserrat } from '@expo-google-fonts/inter';

const input = StyleSheet.create({
	title: {
		fontFamily: 'Montserrat',
		fontWeight: 400,
		fontSize: 14,
		color: '#454C57',
		marginTop: 10,
		marginBottom: 5,
		marginLeft: 40,
		textTransform: 'uppercase',
	},
	text: {
		padding: 20,
		color: '#454C57',
		fontFamily: 'Montserrat',
		fontWeight: 500,
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
