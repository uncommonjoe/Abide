import React from 'react';
import { SafeAreaView, ScrollView, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TitleText } from '../../assets/styles/Text';
import page from '../../assets/styles/page.style';

import SelectTrack from '../../components/SelectTrack';

const SelectTrackScreen = () => {
	const windowSize = useWindowDimensions();

	return (
		<ScrollView
			style={[
				page.container,
				page.statusBarOffset,
				{
					paddingBottom: 50,
					marginHorizontal: windowSize.width > 500 ? 200 : 0,
				},
			]}
			contentInsetAdjustmentBehavior='automatic'
		>
			<SafeAreaView>
				<StatusBar style='dark' />
				<TitleText style={{ marginTop: 40 }}>
					Select Track to Begin
				</TitleText>

				<SelectTrack />
			</SafeAreaView>
		</ScrollView>
	);
};

export default SelectTrackScreen;
