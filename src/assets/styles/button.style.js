import { StyleSheet } from 'react-native';
import { Montserrat } from '@expo-google-fonts/inter';

const button = StyleSheet.create({
	button: {
		padding: 20,
		textAlign: 'center',
	},
	green: {
		backgroundColor: '#596B55',
	},
	blue: {
		backgroundColor: '#454C57',
	},
	tan: {
		backgroundColor: '#C8B598',
	},
	brown: {
		backgroundColor: '#746756',
	},
	red: {
		backgroundColor: '#802119',
	},
	text: {
		color: 'white',
		fontFamily: 'Montserrat',
		fontWeight: 700,
		fontSize: 20,
		textTransform: 'uppercase',
	},
});

export default button;
