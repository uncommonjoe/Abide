import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import useAuthentication from '../utils/hooks/useAuthentication';
import { addTrack } from '../config/firebase';
import { Text } from '../assets/styles/Text';
import NavService from '../navigation/NavService';
import button from '../assets/styles/button.style';
import page from '../assets/styles/page.style';

const SelectTrack = () => {
	const [loading, setLoading] = useState(false);
	const user = useAuthentication();

	const submit = async (track) => {
		global.usrSettngs = { ...user.user, track };
		if (user && track) {
			let data = {
				user: user.user,
				option: track,
			};

			setLoading(true);
			await addTrack(data);
			NavService.resetStack('UserStack', { user });
		} else {
			setLoading(false);
			console.warn('no user');
		}
	};

	return (
		<>
			{loading ? (
				<ActivityIndicator size='small' color='#000' />
			) : (
				<View>
					<View style={page.section}>
						<TouchableOpacity
							style={[button.button, button.blue]}
							onPress={() => submit('Track 1')}
						>
							<Text style={button.text}>Track 1</Text>
						</TouchableOpacity>

						<Text style={local.description}>
							Read the New Testament three times by reading two
							chapters a day for five days&nbsp;a&nbsp;week.
						</Text>
					</View>

					<View style={page.section}>
						<TouchableOpacity
							style={[button.button, button.tan]}
							onPress={() => submit('Track 2')}
						>
							<Text style={button.text}>Track 2</Text>
						</TouchableOpacity>

						<Text style={local.description}>
							Read the New Testament three times and
							Psalms/Proverbs twice by reading three chapters a
							day for five days&nbsp;a&nbsp;week.
						</Text>
					</View>

					<View style={page.section}>
						<TouchableOpacity
							style={[button.button, button.red]}
							onPress={() => submit('Track 3')}
						>
							<Text style={button.text}>Track 3</Text>
						</TouchableOpacity>

						<Text style={local.description}>
							Read the New Testament three times, Psalms/Proverbs
							twice and the Old Testament once by reading five
							chapters a day for five days&nbsp;a&nbsp;week.
						</Text>
					</View>
				</View>
			)}
		</>
	);
};

const local = StyleSheet.create({
	description: {
		fontSize: 14,
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 30,
		paddingHorizontal: 10,
		color: '#454C57',
	},
});

export default SelectTrack;
