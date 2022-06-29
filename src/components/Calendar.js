import React, { useEffect, useState, useRef } from 'react';
import {
	StyleSheet,
	View,
	FlatList,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import Moment from 'moment';
import { Text, TitleText } from '../assets/styles/Text';
import CalendarStrip from 'react-native-calendar-strip';
let { width } = Dimensions.get('window');

const Calendar = ({ setSelectedDay, selectedDay }) => {
	return (
		<View style={{ padding: 20 }}>
			<TitleText>Calendar</TitleText>
			<CalendarStrip
				style={calendar.calendar}
				scrollable
				scrollerPaging={true}
				upperCaseDays={false}
				shouldAllowFontScaling={false}
				calendarColor={'white'}
				innerStyle={calendar.container}
				iconContainer={{ display: 'none' }}
				calendarHeaderFormat={'MMMM, YYYY'}
				calendarHeaderContainerStyle={calendar.header}
				calendarHeaderStyle={calendar.headerTitle}
				dayComponentHeight={90}
				maxDayComponentSize={100}
				dayContainerStyle={calendar.dayContainer}
				dateNameStyle={calendar.month}
				dateNumberStyle={calendar.day}
				selectedDate={selectedDay}
				onDateSelected={(date) =>
					setSelectedDay(Moment(date).format('ddd, MMM D, YYYY'))
				}
				highlightDateContainerStyle={calendar.selected}
				highlightDateNameStyle={[calendar.month, { color: 'white' }]}
				highlightDateNumberStyle={[calendar.day, { color: 'white' }]}
			/>
		</View>
	);
};

const calendar = StyleSheet.create({
	calendar: {
		paddingVertical: 10,
		height: 140,
		width: width - 40,
	},
	container: {
		backgroundColor: 'white',
		flex: 1,
	},
	header: {
		paddingHorizontal: 10,
		paddingBottom: 10,
	},
	headerTitle: {
		alignSelf: 'flex-start',
		color: '#2A292E',
		fontSize: 14,
	},
	selected: {
		backgroundColor: '#454C57',
	},
	dayContainer: {
		borderRadius: 0,
	},
	month: {
		fontWeight: '700',
		fontSize: 14,
		paddingTop: 10,
		marginBottom: 20,
	},
	day: {
		color: '#AFADB9',
		fontSize: 16,
		fontWeight: 'normal',
		paddingBottom: 10,
	},
});

export default Calendar;
