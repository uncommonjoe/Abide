import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';

// Custom radio buttons
// https://blog.logrocket.com/create-radio-buttons-react-native/

const RadioButton = ({ data, onSelect }) => {
	const [userOption, setUserOption] = useState(null);

	const selectHandler = (value) => {
		onSelect(value);
		setUserOption(value);
	};

	return (
		<View>
			{data.map((item) => {
				return (
					<Pressable
						key={item.value}
						style={
							item.value === userOption
								? styles.selected
								: styles.unselected
						}
						onPress={() => selectHandler(item.value)}
					>
						<Text style={styles.option}>{item.value}</Text>
					</Pressable>
				);
			})}

			<Text>User option: {userOption}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	option: {
		fontSize: 20,
		textAlign: 'center',
		padding: 10,
		color: '#000',
	},
	unselected: {
		backgroundColor: '#f0f0f0',
		marginBottom: 5,
	},
	selected: {
		backgroundColor: 'lightblue',
		marginBottom: 5,
	},
});

export default RadioButton;
