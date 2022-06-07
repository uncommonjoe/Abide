import React, {
	useState,
	createRef,
	useRef,
	useMemo,
	useCallback,
} from 'react';
import {
	StyleSheet,
	View,
	SafeAreaView,
	TouchableOpacity,
	Text,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Moment from 'moment';
import TodaysReading from '../components/TodaysReading';
import Calendar from '../components/Calendar';
import BottomSheet, {
	useBottomSheetDynamicSnapPoints,
	BottomSheetView,
	BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import { PanGestureHandler } from 'react-native-gesture-handler';

const HomePage = ({ setHeaderTitle }) => {
	const actionSheetRef = createRef();
	const bottomSheetRef = useRef();

	// variables
	const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);

	// callbacks
	const handleSheetChanges = useCallback(() => {
		console.log('handleSheetChanges');
	}, []);

	const initialSnapPoints = useMemo(() => ['25%', 'CONTENT_HEIGHT'], []);

	const {
		animatedHandleHeight,
		animatedSnapPoints,
		animatedContentHeight,
		handleContentLayout,
	} = useBottomSheetDynamicSnapPoints(initialSnapPoints);

	// Get today's date to default into Today's Reading and Calendar
	let getDate = new Date();

	// addYear is just to use next years data
	let addYear = Moment(getDate).add(1, 'y'); // TODO: For testing purposes. Remove before production

	// Format the date
	let today = Moment(addYear).format('ddd, MMM D, YYYY');

	// Create selectedDay state and default it to today
	const [selectedDay, setSelectedDay] = useState(today);

	return (
		<View style={styles.container}>
			<SafeAreaView>
				<StatusBar style='dark' />

				<View style={styles.section}>
					<Calendar
						setSelectedDay={setSelectedDay}
						selectedDay={selectedDay}
					/>
				</View>

				<TodaysReading
					selectedDay={selectedDay}
					setHeaderTitle={setHeaderTitle}
				/>

				<TouchableOpacity
					onPress={() => {
						actionSheetRef.current?.setModalVisible();
					}}
				>
					<Text>Open ActionSheet</Text>
				</TouchableOpacity>

				<PanGestureHandler onGestureEvent={panGestureEvent}>
					{' '}
					<Animated.View style={[styles.square, rStyle]} />{' '}
				</PanGestureHandler>
			</SafeAreaView>

			{/* <BottomSheet
				ref={bottomSheetRef}
				snapPoints={snapPoints}
				index={1}
				onChange={handleSheetChanges}
			>
				<View style={styles.contentContainer}>
					<Text>Awesome 🎉</Text>
				</View>
			</BottomSheet> */}

			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={animatedSnapPoints}
				handleHeight={animatedHandleHeight}
				contentHeight={animatedContentHeight}
			>
				<BottomSheetScrollView
					onLayout={handleContentLayout}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
				>
					{Array(101)
						.fill(1, 0, 101)
						.map((val, index) => (
							<Text>Hello</Text>
						))}
				</BottomSheetScrollView>
			</BottomSheet>
		</View>
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
