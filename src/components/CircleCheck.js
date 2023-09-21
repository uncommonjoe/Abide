import React from 'react';
import { StyleSheet, View, Text, Pressable, Platform } from 'react-native';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { updateReadingStatus } from '../config/firebase';

const CircleCheck = ({ isComplete, color, readingObj, onChange }) => {
	const selectHandler = async () => {
		onChange(!isComplete);
		if (readingObj) {
			let props = {
				...readingObj,
				uid: global.user.uid,
				isComplete: !isComplete,
			};
			await updateReadingStatus(props);

			let index = global.userReadings.findIndex(
				(val) =>
					val.date == readingObj.date &&
					val.reading == readingObj.reading
			);
			if (index >= 0) global.userReadings.splice(index, 1, props);
			else global.userReadings.splice(index, 0, props);
		}
	};

	return (
		<Pressable
			key={isComplete}
			style={[styles.circle, { borderColor: color }]}
			onPress={() => selectHandler()}
		>
			<Text>
				{isComplete ? (
					<View style={styles.icon}>
						<FontAwesomeIcon
							icon={faCheck}
							color={color}
							size={20}
						/>
					</View>
				) : (
					''
				)}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	circle: {
		borderWidth: 1,
		width: 34,
		height: 34,
		borderRadius: 34 / 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		paddingTop: 9,
		...Platform.select({
			android: {
				// Styles specific to Android
				paddingTop: 3,
			},
		}),
	},
});

export default CircleCheck;
