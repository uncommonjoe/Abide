import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { updateReadingStatus } from '../config/firebase';

const CircleCheck = ({ state, color, readingObj }) => {
	const [isChecked, updateIsChecked] = useState(state);

	const selectHandler = (readingObj, check) => {
		//updateIsChecked((prevCheck) => !prevCheck);
		const toggle = React.useCallback(() => setIsToggled(!isToggled));
		updateIsChecked(toggle);
		//updateIsChecked(({ check }) => ({ check: !check }));

		if (readingObj) {
			let props = {
				...readingObj,
				uid: global.user.uid,
				isComplete: isChecked,
			};

			return updateReadingStatus(props);
		}
	};

	return (
		<Pressable
			key={isChecked}
			style={[styles.circle, { borderColor: color }]}
			onPress={() => selectHandler(readingObj, isChecked)}
		>
			<Text>
				{isChecked ? (
					<FontAwesomeIcon
						style={styles.icon}
						icon={faCheck}
						color={color}
						size={20}
					/>
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
		marginTop: 3,
	},
});

export default CircleCheck;
