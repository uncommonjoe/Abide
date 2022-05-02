import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	ActivityIndicator,
	FlatList,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import Moment from 'moment';
import { StatusBar } from 'expo-status-bar';
import { TitleText, Text } from '../assets/styles/Text';
import { filter, remove } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import ReadScreen from '../pages/scriptures/ReadScreen';

const TodaysReading = () => {
	const [isLoading, setLoading] = useState(true);
	const [todaysObject, setTodaysObject] = useState(null);
	const navigation = useNavigation();

	const userObj = {
		myTrack: 'track 3',
	};

	const getPlan = async () => {
		try {
			const response = await fetch(
				'https://cornerstonebillings.org/api/abide-small.json?v=1'
			);
			const json = await response.json();

			// Filter plans and get the object that matches todays date
			const datesMatch = filter(json.plans, function (p) {
				if (p.date == 'Tue, Jul 5, 2022') {
					// Filter track by users selected track
					return p.date;
				}
			});

			filter(datesMatch[0].tracks, function (t) {
				if (t.title == userObj.myTrack) {
					// Create collection of tracks based on users selected track
					if (t.title == 'track 1') {
						var pickTracks = remove(
							datesMatch[0].tracks,
							function (r) {
								return (
									//r.title == 'track 2' || r.title == 'track 3'
									r.title == 'track 1' // for some reason the remove is include
								);
							}
						);

						console.log('track 1', pickTracks);
						setTodaysObject(pickTracks);

						//todaysObject = pick(p.tracks[0], ['track 1']);
					} else if (t.title == 'track 2') {
						var pickTracks = remove(
							datesMatch[0].tracks,
							function (r) {
								return (
									//r.title == 'track 3'
									r.title == 'track 1' || r.title == 'track 2' // for some reason the remove is include
								);
							}
						);

						console.log('track 2', pickTracks);
						setTodaysObject(pickTracks);
					} else if (t.title == 'track 3') {
						console.log('track 3', datesMatch[0].tracks);
						setTodaysObject(datesMatch[0].tracks);
					}
				}
			});
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const selectReading = (reading) => {
		console.log('You selected ', reading);
		navigation.navigate('ReadScreen');
	};

	useEffect(() => {
		getPlan();
	}, []);

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
								<Text>{item.reading1}</Text>
								<Text>{item.reading2}</Text>
							</TouchableOpacity>
						)}
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
