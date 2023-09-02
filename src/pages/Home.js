import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Moment from 'moment';
import TodaysReading from '../components/TodaysReading';
import Calendar from '../components/Calendar';
import userReadings from '../utils/hooks/userReadings';
import page from '../assets/styles/page.style';

const HomePage = ({ setHeaderTitle }) => {
	const { usrReadings } = userReadings();
	const [selectedDay, setSelectedDay] = useState();

	global.userReadings = usrReadings;
	global.planTitle = '2022-2023';

	// Get today's date to default into Today's Reading and Calendar
	let getDate = new Date();

	// Format the date
	let today = Moment(getDate).format('ddd, MMM D, YYYY');

	useEffect(() => {
		// Create selectedDay state and default it to today
		setSelectedDay(today);
	}, []);

	return (
		<ScrollView style={[styles.container, page.statusBarOffset]}>
			<SafeAreaView style={{ flex: 1 }}>
				<StatusBar style='dark' />

				<View style={{ ...styles.section, padding: 0 }}>
					<Calendar
						setSelectedDay={setSelectedDay}
						selectedDay={selectedDay}
					/>
				</View>

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
		backgroundColor: '#F3F2F8',
	},
	section: {
		padding: 20,
	},
});

export default HomePage;
