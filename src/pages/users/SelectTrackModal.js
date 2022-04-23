import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { getAuth } from 'firebase/auth';
import RadioButton from '../../components/RadioButton';
import { useNavigation } from '@react-navigation/native';

const SelectTrackModal = () => {
	const navigation = useNavigation();
	const auth = getAuth();
	const [option, setOption] = useState(null);

	const data = [
		{ value: 'Track 1' },
		{ value: 'Track 2' },
		{ value: 'Track 3' },
	];

	const submit = async () => {
		// try {
		// 	const docRef = await addDoc(collection(db, 'users'), {
		// 		first: 'Ada',
		// 		last: 'Lovelace',
		// 		born: 1815,
		// 	});
		// 	console.log('Document written with ID: ', docRef.id);
		// } catch (e) {
		// 	console.error('Error adding document: ', e);
		// }
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
