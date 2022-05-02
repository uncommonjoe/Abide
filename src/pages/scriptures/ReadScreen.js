import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import Scripture from '../../components/Scripture';

const ReadScreen = () => {
	const reading = 'Matt 2';

	return (
		<View>
			<Scripture passage={reading} />
		</View>
	);
};

export default ReadScreen;
