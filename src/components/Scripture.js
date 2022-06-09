import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text, TitleText } from '../assets/styles/Text';
import { ESV_API_KEY } from '@env';
import reactStringReplace from 'react-string-replace';
import Header from './Header';
import * as Speech from 'expo-speech';
import { useIsFocused } from '@react-navigation/native';

const Scripture = ({ reading, userName }) => {
	const isFocused = useIsFocused();
	const [isLoading, setLoading] = useState(true);
	const [passageText, setPassageText] = useState();


	console.log('erfs', userName)

	const getPassageText = async () => {
		const url = 'https://api.esv.org/v3/passage/text/?q=';
		const apiSettings =
			'&include-short-copyright=false' +
			'&include-footnotes=false' +
			'&include-passage-references=false' +
			'&include-footnotes=false' +
			'&indent-paragraphs=0';
		const reference = reading.passage.split(' ').join('+');
		console.log(reference)
		try {
			const response = await fetch(url + reference + apiSettings, {
				method: 'get',
				headers: new Headers({
					Authorization: ESV_API_KEY,
					'Content-Type': 'application/x-www-form-urlencoded',
				}),
			});

			const json = await response.json();

			// Remove brackets from verses
			const noBrackets = json.passages[0].replace(/[\])}[{(]/g, '');

			// Add <Text> and fontSize to verses
			const verseStyle = reactStringReplace(
				noBrackets,
				/(\d+)/g,
				(match) => (
					<Text
						style={{
							fontSize: 14,
							textAlignVertical: 'super',
							verticalAlign: 'super',
						}}
					>
						{match}
					</Text>
				)
			);

			setPassageText(verseStyle);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getPassageText();
	}, []);
	const [state, setState] = useState(true);
	const speak = () => {
		if (state) {
			const thingToSay = `${passageText}`;
			Speech.speak(thingToSay);
			setState(false)
		} else if (!state) {
			Speech.stop();
			setState(true)
		}
	};

	useEffect(() => {
		Speech.stop()
	}, [isFocused])

	return (
		<>
			<Header title={userName} onPress={() => speak()} />
			<View style={{ marginTop: '10%', paddingHorizontal: 25 }}>
				{isLoading ? (
					<ActivityIndicator />
				) : (
					<Text style={styles.passageText}>{passageText}</Text>
				)}


				<Text style={styles.copywriteText}>
					ESV® Bible (The Holy Bible, English Standard Version®),
					copyright © 2001 by Crossway, a publishing ministry of Good News
					Publishers. Used by permission. All rights reserved. The Holy
					Bible, English Standard Version (ESV) is adapted from the
					Revised Standard Version of the Bible, copyright Division of
					Christian Education of the National Council of the Churches of
					Christ in the U.S.A. All rights reserved. For information on how
					the ESV can be quoted, please visit our permission site
					(https://www.crossway.org/permissions/).
				</Text>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	passageText: {
		fontSize: 20,
		lineHeight: 30,
	},
	copywriteText: {
		fontSize: 12,
		color: '#aaa',
		paddingHorizontal: 40,
		paddingVertical: 80,
		textAlign: 'center',
	},
});

export default Scripture;
