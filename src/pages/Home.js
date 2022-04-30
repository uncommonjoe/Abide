import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import TodaysReading from '../components/TodaysReading';
import Calendar from '../components/Calendar';

const HomePage = () => {
	const navigation = useNavigation();

	const userObj = {
		myTrack: 'track 3',
	};

	let getDate = new Date();
	let today = Moment(getDate).format('dd, MMM d, YYYY');

	useEffect(() => {}, []);

	return (
		<View style={{ flex: 1, padding: 24 }}>
			<View>
				<Calendar date={today} />

				<TodaysReading date={today} />
			</View>
		</View>
	);
};

export default HomePage;
