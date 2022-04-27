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
import { useNavigation } from '@react-navigation/native';

export default function HomePage() {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const navigation = useNavigation();

	let today = new Date();
	let date = Moment(today).format('dd, MMM d, YYYY');

	const getPlan = async () => {
		try {
			const response = await fetch(
				'https://cornerstonebillings.org/api/abide-small.json'
			);
			const json = await response.json();
			setData(json.plans);
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
								<Text>{item.date}</Text>
							</View>
						)}
					/>
				)}
			</View>
		</View>
	);
}
