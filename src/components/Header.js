import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	ActivityIndicator,
	SafeAreaView,
} from 'react-native';
import { Text, TitleText } from '../assets/styles/Text';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import CircleCheck from './CircleCheck';

const Header = ({
	title,
	onChange = () => {},
	onSoundPress = () => {},
	loading = false,
}) => {
	return (
		<SafeAreaView>
			<View style={styles.header}>
				<Text style={styles.title}>{title.passage}</Text>

				<View style={styles.buttonsWrap}>
					<TouchableOpacity
						style={styles.button}
						onPress={onSoundPress}
						color='blue'
						disabled={loading}
					>
						{loading ? (
							<ActivityIndicator size='small' color='#000' />
						) : (
							<FontAwesomeIcon
								icon={faVolumeHigh}
								color={'#454C57'}
								size={28}
							/>
						)}
					</TouchableOpacity>

					<CircleCheck
						isComplete={title.isComplete}
						readingObj={title}
						color={'#454C57'}
						onChange={onChange}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#F3F2F8',
		width: '100%',
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	title: {
		color: '#454C57',
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
		textTransform: 'uppercase',
	},
});

export default Header;
