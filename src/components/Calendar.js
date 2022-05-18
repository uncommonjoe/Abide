import React, { useEffect, useState, useRef } from 'react';
import {
	StyleSheet,
	View,
	ActivityIndicator,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import Moment from 'moment';
import { Text, TitleText } from '../assets/styles/Text';
import { map } from 'lodash';
import { useNavigation } from '@react-navigation/native';

const Calendar = ({ setSelectedDay }) => {
	const [isLoading, setLoading] = useState(true);
	const [currentWeek, setCurrentWeek] = useState(null);
	const componentMounted = useRef(true);

	const getWeekRange = () => {
		let now = new Date();

		// set time to some convenient value
		now.setHours(0, 0, 0, 0);

		// Get the previous Monday
		let monday = new Date(now);
		monday.setDate(monday.getDate() - monday.getDay() + 1);

		// Get next Monday
		let nextMonday = new Date(now);
		nextMonday.setDate(nextMonday.getDate() - nextMonday.getDay() + 8);

		// Loop through days between monday and nextMonday and add to week array
		let week = [];
		for (let m = Moment(monday); m.isBefore(nextMonday); m.add(1, 'days')) {
			const dayObj = {
				title: m.format('dd'),
				day: m.format('DD'),
				date: m.format('ddd, MMM D, YYYY'),
			};

			week.push(dayObj);
		}

		// Return array of date objects
		console.log('week ', week);
		return week;
	};

	const selectDay = (day) => {
		let selectedDay = Moment(day.date)
			.add(1, 'y')
			.format('ddd, MMM D, YYYY'); // TODO: For testing purposes. Remove before production
		setSelectedDay(selectedDay);
		console.log('You selected ', day);
	};

	useEffect(async () => {
		setLoading(true);
		var someResponse = await getWeekRange();
		setCurrentWeek(someResponse);
		setLoading(false);

		if (componentMounted.current) {
			// (5) is component still mounted?
			setCurrentWeek(someResponse); // (1) write data to state
			setLoading(false); // (2) write some value to state
		}
		return () => {
			// This code runs when component is unmounted
			componentMounted.current = false; // (4) set it to false when we leave the page
		};
	}, []);

	return (
		<View>
			<TitleText>Calendar</TitleText>

			<View style={styles.container}>
				<FlatList
					horizontal={true}
					data={currentWeek}
					keyExtractor={(item) => item.day}
					renderItem={({ item }) => (
						<TouchableOpacity
							key={item}
							onPress={() => selectDay(item)}
							style={styles.button}
						>
							<Text>{item.title}</Text>
							<Text>{item.day}</Text>
						</TouchableOpacity>
					)}
				/>
			</View>
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

export default Calendar;
