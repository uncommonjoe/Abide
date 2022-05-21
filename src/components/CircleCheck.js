import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const CircleCheck = ({ state }) => {
	const [isChecked, updateIsChecked] = useState(state);

	const selectHandler = (value) => {
		updateIsChecked((value) => !value);
	};

	return (
		<View>
			<Pressable
				key={isChecked}
				style={styles.circle}
				onPress={() => selectHandler(isChecked)}
			>
				{isChecked ? (
					<FontAwesomeIcon icon={faCheck} color={'white'} size={20} />
				) : (
					''
				)}
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	circle: {
		borderColor: 'white',
		borderWidth: 1,
		width: 34,
		height: 34,
		borderRadius: 34 / 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default CircleCheck;
