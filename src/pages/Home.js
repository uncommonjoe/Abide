import React, { useEffect, useState } from 'react';
import {
	View,
	ActivityIndicator,
	FlatList,
	SafeAreaView,
	ScrollView,
} from 'react-native';
import Moment from 'moment';
import { StatusBar } from 'expo-status-bar';
import styles from '../assets/styles/container.style';
import { TitleText, Text } from '../assets/styles/Text';
import { filter, pick } from 'lodash';
import { useNavigation } from '@react-navigation/native';

export default function HomePage() {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const navigation = useNavigation();

	const userObj = {
		myTrack: 'track 2',
	};

	let today = new Date();
	let date = Moment(today).format('dd, MMM d, YYYY');
	let todaysObject, myTrack;

	const getPlan = async () => {
		try {
			const response = await fetch(
				'https://cornerstonebillings.org/api/abide-small.json?v=1'
			);
			const json = await response.json();

			// Filter plans and get the object that matches todays date
			filter(json.plans, function (p) {
				if (p.date == 'Tue, Jul 5, 2022') {
					// Filter track by users selected track
					filter(p.tracks, function (t) {
						if ((t = userObj.myTrack)) {
							myTrack = t;

							// Create collection of tracks based on users selected track
							if (myTrack == 'track 1') {
								todaysObject = pick(p.tracks[0], ['track 1']);
							} else if (myTrack == 'track 2') {
								todaysObject = pick(p.tracks[0], [
									'track 1',
									'track 2',
								]);
							} else if (myTrack == 'track 3') {
								todaysObject = pick(p.tracks[0], [
									'track 1',
									'track 2',
									'track 3',
								]);
							}

							setData(todaysObject);
						}
					});
				}
			});
			console.log(todaysObject);

			// todaysObject = filter(json.plans, function (o) {
			// 	return o.date == 'Tue, Jul 5, 2022'; // should be today's date
			// });
			// console.log(todaysObject[0]);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getPlan();
	}, []);

	return (
		<View style={{ flex: 1, padding: 24 }}>
			<View>
				<Text>
					{'Current Date'} - {date}
				</Text>

				{isLoading ? (
					<ActivityIndicator />
				) : (
					<FlatList
						data={data}
						renderItem={({ item, index }) => (
							<View>
								<Text>{item[0]}</Text>
							</View>
						)}
					/>
				)}
			</View>
		</View>
	);
}
