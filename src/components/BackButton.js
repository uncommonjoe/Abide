import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const BackButton = () => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			style={{ marginVertical: 20 }}
			onPress={() => navigation.goBack()}
		>
			<FontAwesomeIcon icon={faArrowLeft} color={'#424142'} size={24} />
		</TouchableOpacity>
	);
};

export default BackButton;
