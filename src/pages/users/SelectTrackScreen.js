import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
	Dimensions,
	useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
let { height, width } = Dimensions.get('window');
import { TitleText, Text } from '../../assets/styles/Text';
import button from '../../assets/styles/button.style';
import input from '../../assets/styles/input.style';
import page from '../../assets/styles/page.style';
import useAuthentication from '../../utils/hooks/useAuthentication';
import { addTrack } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';

const SelectTrackScreen = (props) => {
	const [option, setOption] = useState(null);
	const [loading, setLoading] = useState(false);
	const user = useAuthentication();
	const navigation = useNavigation();
	const windowSize = useWindowDimensions();

	const data = [
		{ value: 'Track 1' },
		{ value: 'Track 2' },
		{ value: 'Track 3' },
	];

	const submit = async (track) => {
		global.usrSettngs = { ...user.user, track };
		if (user && track) {
			let data = {
				user: user.user,
				option: track,
			};

			setLoading(true);
			await addTrack(data);
			setLoading(false);
			navigation.navigate('UserStack', { user: user.user });
		} else {
			console.log('no user');
		}
	};

	return (
		<>
			<ScrollView
				style={[
					page.container,
					page.statusBarOffset,
					{
						paddingBottom: 50,
						marginHorizontal: windowSize.width > 500 ? 200 : 0,
					},
				]}
				contentInsetAdjustmentBehavior='automatic'
			>
				<SafeAreaView>
					<StatusBar style='dark' />

					<TitleText style={{ marginTop: 40 }}>
						Select Track to Begin
					</TitleText>

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
				</SafeAreaView>
			</ScrollView>
			{loading ? (
				<View
					style={{
						height,
						width,
						position: 'absolute',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'rgba(0,0,0,0.7)',
					}}
				>
					<ActivityIndicator size='large' color='#fff' />
				</View>
			) : null}
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

export default SelectTrackScreen;
