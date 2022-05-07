import React, { useEffect, useState, useRef } from 'react';
import {
	StyleSheet,
	View,
	ActivityIndicator,
	ScrollView,
	SafeAreaView,
} from 'react-native';
import { Text, TitleText } from '../assets/styles/Text';
import { ESV_API_KEY } from '@env';

const Scripture = ({ reading }) => {
	const [isLoading, setLoading] = useState(true);
	const [passageText, setPassageText] = useState();
	console.log(reading);

	const getPassageText = async () => {
		const url = 'https://api.esv.org/v3/passage/text/?q=';
		const apiSettings =
			'&include-short-copyright=false' +
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
			setPassageText(json);
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
		<View>
			<Text>Scripture</Text>

			{isLoading ? (
				<ActivityIndicator />
			) : (
				<Text style={passageText}>{passageText.passages}</Text>
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
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	passageText: {
		fontSize: 14,
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
