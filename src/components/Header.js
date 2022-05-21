import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, TitleText } from '../assets/styles/Text';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	faVolumeHigh,
	faCircle,
	faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

//https://docs.expo.dev/guides/using-custom-fonts/
import { Montserrat } from '@expo-google-fonts/inter';

const Header = ({ title }) => {
	return (
		<View style={styles.header}>
			<Text style={styles.title}>{title.passage}</Text>

			<View style={styles.buttonsWrap}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => alert('Listen!')}
					color='blue'
				>
					<FontAwesomeIcon
						icon={faVolumeHigh}
						color={'#454C57'}
						size={36}
					/>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.button}
					onPress={() => alert('Complete')}
					color='red'
				>
					<FontAwesomeIcon
						icon={faCircle}
						color={'#454C57'}
						size={36}
					/>
					<Text style={styles.buttonText}>Complete</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#F3F2F8',
		height: '100%',
		width: '100%',
		padding: 20,
	},
	title: {
		color: '#454C57',
		fontWeight: 600,
		fontFamily: 'Montserrat',
		fontSize: 24,
		textTransform: 'uppercase',
	},
	buttonsWrap: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	button: {
		backgroundColor: 'transparent',
		marginHorizontal: 10,
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	buttonText: {
		marginLeft: 10,
		fontFamily: 'Montserrat',
		textTransform: 'uppercase',
	},
});

export default Header;
