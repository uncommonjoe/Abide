import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text, TitleText } from '../assets/styles/Text';
import { ESV_API_KEY } from '@env';
import reactStringReplace from 'react-string-replace';

const Scripture = ({ reading, loading }) => {
	const [isLoading, setLoading] = useState(true);
	const [passageText, setPassageText] = useState();
	const getPassageText = async () => {
		const url = 'https://api.esv.org/v3/passage/text/?q=';
		const apiSettings =
			'&include-short-copyright=false' +
			'&include-footnotes=false' +
			'&include-passage-references=false' +
			'&include-footnotes=false' +
			'&indent-paragraphs=0';
		const reference = reading.passage.split(' ').join('+');

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

	return (
		<View style={{ paddingVertical: 20 }}>
			{isLoading || loading ? (
				<ActivityIndicator />
			) : (
				<Text style={styles.passageText}>{passageText}</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	passageText: {
		fontSize: 20,
		lineHeight: 30,
	},
});

export default Scripture;
