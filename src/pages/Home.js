import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import Moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import TodaysReading from '../components/TodaysReading';
import Calendar from '../components/Calendar';

const HomePage = () => {
	const navigation = useNavigation();

	let getDate = new Date();
	let today = Moment(getDate).format('dd, MMM d, YYYY');

	useEffect(() => {}, []);

	return (
		<ScrollView
			style={styles.container}
			contentInsetAdjustmentBehavior='automatic'
		>
			<SafeAreaView>
				<Calendar date={today} />

				<TodaysReading date={today} />
			</SafeAreaView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
});

export default HomePage;
