import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Scripture from '../../components/Scripture';
import page from '../../assets/styles/page.style';
import Header from '../../components/Header';
import { ESV_API_KEY } from '@env';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import { useDispatch, useSelector } from 'react-redux';
import { PlayerAction } from '../../redux/Actions';
// import RNFetchBlob from "rn-fetch-blob";

const ReadScreen = ({ route }) => {
	const [readingObj, setReadingObj] = useState(route.params.reading);
	const [sound, setSound] = useState(null);
	const [loading, setLoading] = useState(true);
	const soundFile = useSelector((state) => state.PlayerReducer.sound);
	//   const readingObj = route.params.reading;
	const onChange = route.params.onChange;
	const index = route.params.index;
	const dispatch = useDispatch();

	useEffect(async () => {
		const reference = readingObj.passage.split(' ').join('+');
		try {
			const response = await fetch(
				`https://api.esv.org/v3/passage/audio/?q=${reference}`,
				{
					method: 'get',
					headers: new Headers({
						Authorization: ESV_API_KEY,
						'Content-Type': 'application/x-www-form-urlencoded',
					}),
				}
			);

			const blob = await response.blob();
			const reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onloadend = async () => {
				let base64 = reader.result;
				setSound({ name: reference, url: base64, playerRef: sound });
				setLoading(false);
			};
		} catch (e) {
			console.error(e);
			setLoading(false);
			throw error;
		}
		return () => {};
	}, []);

	async function playSound(url) {
		// await Audio.setAudioModeAsync({
		//   staysActiveInBackground: true,
		//   interruptionModeAndroid: InterruptionModeIOS.DoNotMix,
		//   shouldDuckAndroid: true,
		//   playThroughEarpieceAndroid: true,
		//   allowsRecordingIOS: false,
		//   interruptionModeIOS: InterruptionModeAndroid.DoNotMix,
		//   playsInSilentModeIOS: true,
		// });
		// const { sound: playerRef } = await Audio.Sound.createAsync(
		//   { uri: sound.url },
		//   { shouldPlay: true }
		// );
		dispatch(
			PlayerAction.SetSound({
				name: sound.name,
				url: sound.url,
				// sound: playerRef,
			})
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<Header
				onSoundPress={() => (soundFile ? null : playSound())}
				title={readingObj}
				loading={loading}
				onChange={(isComplete) => {
					setReadingObj({
						...readingObj,
						isComplete: !readingObj.isComplete,
					});
					onChange(isComplete, index, {
						...readingObj,
						isComplete: !readingObj.isComplete,
					});
				}}
				index={index}
			/>
			<ScrollView
				style={[page.container, styles.background]}
				contentInsetAdjustmentBehavior='automatic'
			>
				<SafeAreaView>
					<StatusBar style='dark' />

					<Scripture reading={readingObj} loading={loading} />
				</SafeAreaView>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	background: {
		backgroundColor: 'white',
	},
});

export default ReadScreen;
