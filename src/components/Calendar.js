import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import Moment from 'moment';
import { Text, TitleText } from '../assets/styles/Text';

const Calendar = ({ setSelectedDay, selectedDay }) => {
	const [currentWeek, setCurrentWeek] = useState(null);
	const [selected, setSelected] = useState(null);
	const componentMounted = useRef(true);

	const getWeekRange = () => {
		let now = new Moment();

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
		let newSelectedDay = Moment(day.date)
			.add(1, 'y')
			.format('ddd, MMM D, YYYY'); // TODO: For testing purposes. Remove before production
		setSelectedDay(newSelectedDay);
		setSelected(day.date);
		console.log('You selected ', day);
	};

	// TODO: For testing purposes. Remove whole method before production
	const convertDate = (date) => {
		let convertedDate = Moment(date)
			.subtract(1, 'y')
			.format('ddd, MMM D, YYYY');
		setSelected(convertedDate);
	};

	useEffect(() => {
		async function fetchData() {
			// Initialize selected date
			convertDate(selectedDay);

			var someResponse = await getWeekRange();
			setCurrentWeek(someResponse);

			if (componentMounted.current) {
				setCurrentWeek(someResponse);
			}
		}
		fetchData();

		return () => {
			// This code runs when component is unmounted
			componentMounted.current = false; // set it to false when we leave the page
		};
	}, []);

	return (
		<View>
			<TitleText>Calendar</TitleText>

			<FlatList
				data={currentWeek}
				keyExtractor={(item) => item.day}
				contentContainerStyle={styles.container}
				scrollEnabled={false}
				renderItem={({ item }) => (
					<TouchableOpacity
						key={item}
						onPress={() => selectDay(item)}
						style={[
							styles.button,
							item.date === selected ? styles.selected : null,
						]}
					>
						<Text
							style={[
								styles.month,
								item.date === selected
									? { color: 'white' }
									: { color: '#2A292E' },
							]}
						>
							{item.title}
						</Text>
						<Text
							style={[
								styles.day,
								item.date === selected
									? { color: 'white' }
									: { color: '#AFADB9' },
							]}
						>
							{item.day}
						</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	button: {
		backgroundColor: 'transparent',
		flexDirection: 'column',
		alignItems: 'center',
		marginBottom: 6,
		paddingHorizontal: 10,
		paddingVertical: 12,
	},
	selected: {
		backgroundColor: '#454C57',
	},
	month: {
		fontWeight: '700',
		fontSize: 14,
		marginBottom: 20,
	},
	day: {
		fontSize: 16,
	},
});

export default Calendar;
