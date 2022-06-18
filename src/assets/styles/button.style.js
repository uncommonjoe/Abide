import { StyleSheet } from 'react-native';
// import {
// 	Montserrat_400Regular,
// 	Montserrat_500Medium,
// 	Montserrat_700Bold,
// } from '@expo-google-fonts/montserrat';

const button = StyleSheet.create({
	button: {
		padding: 20,
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: 60,
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
		//fontFamily: Montserrat_700Bold,
		fontSize: 20,
		textTransform: 'uppercase',
		textAlign: 'center',
	},

	link: {
		padding: 5,
		textAlign: 'left',
		backgroundColor: 'transparent',
	},
	linkText: {
		color: '#454C57',
		textDecorationLine: 'underline',
		fontSize: 16,
	},

	list: {
		backgroundColor: 'transparent',
		paddingVertical: 15,
		textAlign: 'left',
		alignItems: 'left',
		justifyContent: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		minHeight: 50,
	},
	listText: {
		color: '#424142',
		textTransform: 'uppercase',
		fontSize: 16,
	},
	listIcon: {},
});

export default button;
