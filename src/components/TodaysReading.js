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
import CircleCheck from './CircleCheck';
import { filter } from 'lodash';
import { useNavigation } from '@react-navigation/native';

const TodaysReading = ({ selectedDay, setHeaderTitle }) => {
	const [isLoading, setLoading] = useState(true);
	const [todaysObject, setTodaysObject] = useState(null);
	const [hasTracks, setHasTracks] = useState(false);
	const navigation = useNavigation();
	const userObj = {
		track: global.usrSettngs.track,
	};
	let [reading1, reading2, reading3, reading4, reading5] =
		Array(5).fill(false);

	// console.log('global user ', global.user);
	// console.log('global user settings ', global.usrSettngs);
	// console.log('global readings ', global.usrReadings);

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

			const readingsMatch = filter(global.userReadings, function (r) {
				if (r.date == selectedDay) {
					return r;
				}
			});

			if (datesMatch.length > 0) {
				setHasTracks(true);
				console.log('here ', readingsMatch);

				// const readings = [];

				// for (let i = 0; i < 6; i++) {
				//     readings[i] = filter(readingsMatch, function (r) {
				//         if (r.reading == 'Reading ' + [i]) {
				//             return r;
				//         }
				//     });
				// }

				let reading1State = filter(readingsMatch, function (r) {
					if (r.reading == 'Reading 1') {
						return r;
					} else {
						return false;
					}
				});

				if (reading1State.length > 0) {
					reading1 = reading1State[0].isComplete;
				}

				let reading2State = filter(readingsMatch, function (r) {
					if (r.reading == 'Reading 2') {
						return r;
					} else {
						return false;
					}
				});

				if (reading2State.length > 0) {
					reading1 = reading2State[0].isComplete;
				}

				let reading3State = filter(readingsMatch, function (r) {
					if (r.reading == 'Reading 3') {
						return r;
					} else {
						return false;
					}
				});

				if (reading3State.length > 0) {
					reading1 = reading3State[0].isComplete;
				}

				let reading4State = filter(readingsMatch, function (r) {
					if (r.reading == 'Reading 4') {
						return r;
					} else {
						return false;
					}
				});

				if (reading4State.length > 0) {
					reading1 = reading4State[0].isComplete;
				}

				let reading5State = filter(readingsMatch, function (r) {
					if (r.reading == 'Reading 5') {
						return r;
					} else {
						return false;
					}
				});

				if (reading5State.length > 0) {
					reading1 = reading5State[0].isComplete;
				}

				// Create collection of tracks based on users selected track
				switch (userObj.track) {
					case 'Track 1':
						pickTracks = [
							{
								date: datesMatch[0].date,
								reading: 'Reading 1',
								track: 'Track 1',
								passage:
									datesMatch[0].tracks.track1[0].reading1,
								plan: global.planTitle,
								isComplete: reading1,
							},
							{
								date: datesMatch[0].date,
								reading: 'Reading 2',
								track: 'Track 1',
								passage:
									datesMatch[0].tracks.track1[1].reading2,
								plan: global.planTitle,
								isComplete: reading2,
							},
						];

						setTodaysObject(pickTracks);
						break;

					case 'Track 2':
						pickTracks = [
							{
								date: datesMatch[0].date,
								reading: 'Reading 1',
								track: 'Track 1',
								passage:
									datesMatch[0].tracks.track1[0].reading1,
								plan: global.planTitle,
								isComplete: reading1,
							},
							{
								date: datesMatch[0].date,
								reading: 'Reading 2',
								track: 'Track 1',
								passage:
									datesMatch[0].tracks.track1[1].reading2,
								plan: global.planTitle,
								isComplete: reading2,
							},
							{
								date: datesMatch[0].date,
								reading: 'Reading 3',
								track: 'Track 2',
								passage:
									datesMatch[0].tracks.track2[0].reading3,
								plan: global.planTitle,
								isComplete: reading3,
							},
						];

						setTodaysObject(pickTracks);
						break;

					case 'Track 3':
						pickTracks = [
							{
								date: datesMatch[0].date,
								reading: 'Reading 1',
								track: 'Track 1',
								passage:
									datesMatch[0].tracks.track1[0].reading1,
								plan: global.planTitle,
								isComplete: reading1,
							},
							{
								date: datesMatch[0].date,
								reading: 'Reading 2',
								track: 'Track 1',
								passage:
									datesMatch[0].tracks.track1[1].reading2,
								plan: global.planTitle,
								isComplete: reading2,
							},
							{
								date: datesMatch[0].date,
								reading: 'Reading 3',
								track: 'Track 2',
								passage:
									datesMatch[0].tracks.track2[0].reading3,
								plan: global.planTitle,
								isComplete: reading3,
							},
							{
								date: datesMatch[0].date,
								reading: 'Reading 4',
								track: 'Track 3',
								passage:
									datesMatch[0].tracks.track3[0].reading4,
								plan: global.planTitle,
								isComplete: reading4,
							},
							{
								date: datesMatch[0].date,
								reading: 'Reading 5',
								track: 'Track 3',
								passage:
									datesMatch[0].tracks.track3[1].reading5,
								plan: global.planTitle,
								isComplete: reading5,
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

	const selectReading = (reading, setHeaderTitle) => {
		setHeaderTitle(reading);
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
	}, [selectedDay, global.userReadings]);

	return (
		<View>
			<TitleText
				style={{ marginBottom: 20, marginTop: 40, marginLeft: 20 }}
			>
				Today's Reading
			</TitleText>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					style={{ paddingHorizontal: 20 }}
					data={todaysObject}
					keyExtractor={(item) => item.reading}
					horizontal={todaysObject.length === 0 ? false : true}
					renderItem={({ item }) => (
						<View>
							<TouchableOpacity
								key={item}
								activeOpacity={1}
								onPress={() =>
									selectReading(item, setHeaderTitle)
								}
								style={[
									styles.button,
									buttonStyle(item.reading),
								]}
							>
								<Text style={styles.track}>{item.track}</Text>
								<Text style={styles.reading}>
									{item.reading}
								</Text>
								<Text style={styles.passage}>
									{item.passage}
								</Text>
							</TouchableOpacity>

							<View
								style={[
									styles.button,
									buttonStyle(item.reading),
								]}
							>
								<CircleCheck
									state={item.isComplete}
									color={'white'}
									readingObj={item}
								/>
							</View>
						</View>
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
		padding: 20,
		width: 140,
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
