import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import RadioButton from '../../components/RadioButton';
import { useAuthentication } from '../../../src/utils/hooks/useAuthentication';
import { addTrack } from '../../../src/config/firebase';

const SelectTrackModal = () => {
	const [option, setOption] = useState(null);
	const user = useAuthentication();

	const data = [
		{ value: 'Track 1' },
		{ value: 'Track 2' },
		{ value: 'Track 3' },
	];

	const submit = () => {
		if (user) {
			let props = {
				user: user.user,
				option: option,
			};

			return addTrack(props);
		} else {
			console.log('no user');
		}
	};

	return (
		<View style={styles.container}>
			<StatusBar barStyle='light-content' />

			<View style={styles.container}>
				<Text style={styles.title}>Welcome to Abide!</Text>
				<Text style={styles.title}>Select track to begin</Text>

				<View style={styles.control}>
					<RadioButton
						data={data}
						onSelect={(value) => setOption(value)}
					/>

					<Text>{option}</Text>
					<Text style={styles.title}>This can be changed later</Text>

					<Button
						title='Get Started'
						style={styles.control}
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

	control: {
		marginTop: 20,
		marginBottom: 20,
	},

	input: {
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 5,
	},

	title: {
		marginTop: 20,
	},

	error: {
		marginTop: 5,
		color: 'red',
	},
});

export default SelectTrackModal;
