import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import Moment from 'moment';
import TodaysReading from '../components/TodaysReading';
import Calendar from '../components/Calendar';

const HomePage = ({ setHeaderTitle }) => {
	// Get today's date to default into Today's Reading and Calendar
	let getDate = new Date();

	// addYear is just to use next years data
	let addYear = Moment(getDate).add(1, 'y'); // TODO: For testing purposes. Remove before production

	// Format the date
	let today = Moment(addYear).format('ddd, MMM D, YYYY');

	// Create selectedDay state and default it to today
	const [selectedDay, setSelectedDay] = useState(today);

	return (
		<ScrollView
			style={styles.container}
			contentInsetAdjustmentBehavior='automatic'
		>
			<SafeAreaView>
				<Calendar
					setSelectedDay={setSelectedDay}
					selectedDay={selectedDay}
				/>
				<TodaysReading
					selectedDay={selectedDay}
					setHeaderTitle={setHeaderTitle}
				/>
			</SafeAreaView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#F3F2F8',
	},
});

export default HomePage;
