import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { getAuth } from 'firebase/auth';
import RadioButton from '../../components/RadioButton';
import { useNavigation } from '@react-navigation/native';

const SelectTrackModal = () => {
	const navigation = useNavigation();
	const auth = getAuth();

	const data = [
		{ value: 'Track 1' },
		{ value: 'Track 2' },
		{ value: 'Track 3' },
	];

	const submit = async () => {};

	return (
		<View style={styles.container}>
			<StatusBar barStyle='light-content' />

			<View style={styles.container}>
				<Text>Select Track</Text>

				<View style={styles.controls}>
					<RadioButton data={data} />

					<Text>This can be changed later</Text>

					<Button
						title='Continue'
						buttonStyle={styles.control}
						onPress={submit}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},

	controls: {
		flex: 1,
	},

	input: {
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 5,
	},

	title: {
		marginTop: 10,
	},

	error: {
		marginTop: 5,
		color: 'red',
	},
});

export default SelectTrackModal;
