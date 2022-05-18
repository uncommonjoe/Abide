import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	ActivityIndicator,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { TitleText, Text } from '../assets/styles/Text';
import { filter } from 'lodash';
import { useNavigation } from '@react-navigation/native';

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
				'https://cornerstonebillings.org/api/abide.json?v=6'
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

	useEffect(() => {
		getPlan(selectedDay);
	}, [selectedDay]);

	return (
		<View>
			<TitleText>Today's Reading</TitleText>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<View style={styles.container}>
					<FlatList
						horizontal={true}
						data={todaysObject}
						keyExtractor={(item) => item.title}
						renderItem={({ item }) => (
							<TouchableOpacity
								key={item}
								onPress={() => selectReading(item)}
								style={styles.button}
							>
								<Text>{item.title}</Text>
								<Text>{item.track}</Text>
								<Text>{item.passage}</Text>
							</TouchableOpacity>
						)}
						ListEmptyComponent={() =>
							todaysObject.length == 0 && (
								<Text>
									No reading for today. Select another date.
								</Text>
							)
						}
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		//flex: 1,
		backgroundColor: 'lightgray',
		padding: 20,
	},
	button: {
		flex: 1,
		flexDirection: 'row',
		flexGrow: 1,
		backgroundColor: 'white',
		marginHorizontal: 10,
		marginBottom: 6,
		paddingHorizontal: 15,
		paddingVertical: 6,
	},
});

export default TodaysReading;
