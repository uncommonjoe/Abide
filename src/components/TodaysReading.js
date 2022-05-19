import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	ActivityIndicator,
	FlatList,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import { TitleText, Text } from '../assets/styles/Text';
import { filter } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { Montserrat } from '@expo-google-fonts/inter';

const TodaysReading = ({ selectedDay }) => {
	const [isLoading, setLoading] = useState(true);
	const [todaysObject, setTodaysObject] = useState(null);
	const [hasTracks, setHasTracks] = useState(false);
	const navigation = useNavigation();

	// TODO: get users selected track
	const userObj = {
		myTrack: 'track 3',
	};
	// console.log('global user ', global.user);
	// console.log('global prefs ', global.usrSettngs);

	const getPlan = async (selectedDay) => {
		let pickTracks = [];
		try {
			const response = await fetch(
				'https://cornerstonebillings.org/api/abide.json?v=7'
			);
			const json = await response.json();

			// Filter plans and get the object that matches todays date
			const datesMatch = filter(json.plans, function (p) {
				if (p.date == selectedDay) {
					// Filter track by users selected track
					return p.date;
				}
			});

			if (datesMatch.length > 0) {
				setHasTracks(true);

				// Create collection of tracks based on users selected track
				switch (userObj.myTrack) {
					case 'track 1':
						pickTracks = [
							{
								title: 'Reading 1',
								track: 'Track 1',
								passage:
									datesMatch[0].tracks.track1[0].reading1,
							},
							{
								title: 'Reading 2',
								track: 'Track 1',
								passage:
									datesMatch[0].tracks.track1[1].reading2,
							},
						];

						setTodaysObject(pickTracks);
						break;

					case 'track 2':
						pickTracks = [
							{
								title: 'Reading 1',
								track: 'Track 1',
								passage:
									datesMatch[0].tracks.track1[0].reading1,
							},
							{
								title: 'Reading 2',
								track: 'Track 1',
								passage:
									datesMatch[0].tracks.track1[1].reading2,
							},
							{
								title: 'Reading 3',
								track: 'Track 2',
								passage:
									datesMatch[0].tracks.track2[0].reading3,
							},
						];

						setTodaysObject(pickTracks);
						break;

					case 'track 3':
						pickTracks = [
							{
								title: 'Reading 1',
								track: 'Track 1',
								passage:
									datesMatch[0].tracks.track1[0].reading1,
							},
							{
								title: 'Reading 2',
								track: 'Track 1',
								passage:
									datesMatch[0].tracks.track1[1].reading2,
							},
							{
								title: 'Reading 3',
								track: 'Track 2',
								passage:
									datesMatch[0].tracks.track2[0].reading3,
							},
							{
								title: 'Reading 4',
								track: 'Track 3',
								passage:
									datesMatch[0].tracks.track3[0].reading4,
							},
							{
								title: 'Reading 5',
								track: 'Track 3',
								passage:
									datesMatch[0].tracks.track3[1].reading5,
							},
						];

						setTodaysObject(pickTracks);
						break;

					default:
						setHasTracks(false);
				}
			} else {
				setTodaysObject([]);
				setHasTracks(false);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const selectReading = (reading) => {
		navigation.navigate('Read', { reading: reading });
	};

	const buttonStyle = (type) => {
		switch (type) {
			case 'Reading 1':
				return { backgroundColor: '#454C57' };
			case 'Reading 2':
				return { backgroundColor: '#596B55' };
			case 'Reading 3':
				return { backgroundColor: '#C8B598' };
			case 'Reading 4':
				return { backgroundColor: '#756757' };
			case 'Reading 5':
				return { backgroundColor: '#6E260E' };
		}
	};

	useEffect(() => {
		getPlan(selectedDay);
	}, [selectedDay]);

	return (
		<View>
			<TitleText style={{ marginBottom: 20, marginTop: 40 }}>
				Today's Reading
			</TitleText>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					data={todaysObject}
					keyExtractor={(item) => item.title}
					horizontal={todaysObject.length == 0 ? false : true}
					renderItem={({ item }) => (
						<TouchableOpacity
							key={item}
							onPress={() => selectReading(item)}
							style={[styles.button, buttonStyle(item.title)]}
						>
							<Text style={styles.track}>{item.track}</Text>
							<Text style={styles.reading}>{item.title}</Text>
							<Text style={styles.passage}>{item.passage}</Text>
						</TouchableOpacity>
					)}
					ListEmptyComponent={() =>
						todaysObject.length == 0 && (
							<View style={styles.noReadingWrap}>
								<Text style={styles.noReading}>
									No reading for today. Select another date.
								</Text>
							</View>
						)
					}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#454C57',
		flexDirection: 'column',
		marginHorizontal: 5,
		marginBottom: 6,
		padding: 20,
		width: 130,
	},
	track: {
		fontWeight: '700',
		fontSize: 18,
		marginTop: 30,
		marginBottom: 5,
		color: 'white',
		textTransform: 'uppercase',
	},
	reading: {
		color: 'white',
		fontSize: 16,
		marginBottom: 30,
		textTransform: 'uppercase',
	},
	passage: {
		color: 'white',
		fontSize: 22,
		marginBottom: 30,
		textTransform: 'uppercase',
	},
	noReadingWrap: {
		backgroundColor: '#DDDCE3',
		paddingHorizontal: 20,
		paddingVertical: 80,
		textAlign: 'center',
	},
	noReading: {
		color: '#7D7B84',
	},
});

export default TodaysReading;
