import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Scripture from '../../components/Scripture';

const ReadScreen = ({ route }) => {
	const readingObj = route.params.reading;

	return (
		<View>
			<Scripture reading={readingObj} />
		</View>
	);
};

export default ReadScreen;
