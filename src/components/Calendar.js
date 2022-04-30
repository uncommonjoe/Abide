import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import Moment from 'moment';
import { Text, TitleText } from '../assets/styles/Text';
import { useNavigation } from '@react-navigation/native';

const Calendar = (today) => {
	const [isLoading, setLoading] = useState(true);
	const [todaysObject, setTodaysObject] = useState(null);
	const navigation = useNavigation();

	useEffect(() => {}, []);

	return (
		<View>
			<TitleText>Calendar</TitleText>

			<Text>
				{'Current Date'} - {today.date}
			</Text>

			{/* {isLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					data={todaysObject}
					keyExtractor={(item) => item.title}
					renderItem={({ item }) => (
						<View>
							<Text>{item.title}</Text>
							<Text>{item.reading1}</Text>
							<Text>{item.reading2}</Text>
						</View>
					)}
				/>
			)} */}
		</View>
	);
};

export default Calendar;
