import React, { useEffect, useState } from 'react';
import {
	View,
	Image,
	SafeAreaView,
	ScrollView,
	Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import styles from '../../assets/styles/container.style';
// import { Header } from '../../assets/components/header/Header';
// import { TitleText, Text } from '../../assets/styles/Text';
// import Verse from '../../api/GetDailyVerse.js';
// import CurrentDate from '../../assets/components/CurrentDate.js';
// import LatestSermon from '../../api/GetLatestSermon.js';
// import SeriesList from '../../api/GetSeriesList.js';

export default function HomePage() {
	const { windowWidth } = Dimensions.get('window');

	return (
		<View style={styles.container}>
			<StatusBar barStyle='light-content' />
			<Header>
				{/* <Image
					style={{ resizeMode: 'cover', height: 25, width: 190 }}
					source={require('../../../src/assets/img/logo.png')}
				/> */}
			</Header>

			<ScrollView contentInsetAdjustmentBehavior='automatic'>
				<SafeAreaView>
					<View style={styles.page}>
						<TitleText style={{ marginBottom: 25 }}>
							Latest Sermon
						</TitleText>
					</View>
				</SafeAreaView>
			</ScrollView>
		</View>
	);
}
