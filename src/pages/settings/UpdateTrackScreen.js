import React from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import page from '../../assets/styles/page.style';
import { useNavigation } from '@react-navigation/native';
import SelectTrack from '../../components/SelectTrack';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const UpdateTrackScreen = () => {
	const navigation = useNavigation();

	return (
		<ScrollView
			style={[page.container, { backgroundColor: 'white' }]}
			contentInsetAdjustmentBehavior='automatic'
		>
			<SafeAreaView style={{ marginBottom: 450 }}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={{ marginBottom: 20 }}
				>
					<FontAwesomeIcon
						icon={faArrowLeft}
						color={'#424142'}
						size={24}
					/>
				</TouchableOpacity>

				<SelectTrack />
			</SafeAreaView>
		</ScrollView>
	);
};

export default UpdateTrackScreen;
