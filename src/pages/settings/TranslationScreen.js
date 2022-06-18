import React from 'react';
import {
	View,
	StyleSheet,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import page from '../../assets/styles/page.style';
import { TitleText, Text } from '../../assets/styles/Text';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import button from '../../assets/styles/button.style';

const TranslationScreen = () => {
	const navigation = useNavigation();

	return (
		<ScrollView
			style={[page.container, { backgroundColor: 'white' }]}
			contentInsetAdjustmentBehavior='automatic'
		>
			<SafeAreaView style={{ marginBottom: 350 }}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<FontAwesomeIcon
						icon={faArrowLeft}
						color={'#424142'}
						size={24}
					/>
				</TouchableOpacity>

				<TitleText style={[styles.title]}>
					English Standard Version®
				</TitleText>

				<Text style={{ lineHeight: 24 }}>
					ESV® Bible (The Holy Bible, English Standard Version®),
					copyright © 2001 by Crossway, a publishing ministry of Good
					News Publishers. Used by permission. All rights reserved.
					The Holy Bible, English Standard Version (ESV) is adapted
					from the Revised Standard Version of the Bible, copyright
					Division of Christian Education of the National Council of
					the Churches of Christ in the U.S.A. All rights reserved.
					For information on how the ESV can be quoted, please visit
					our permission site (https://www.crossway.org/permissions)
				</Text>
			</SafeAreaView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		paddingTop: 20,
	},

	copywriteText: {
		fontSize: 12,
		color: '#aaa',
		paddingHorizontal: 40,
		paddingVertical: 80,
		textAlign: 'center',
	},
});

export default TranslationScreen;
