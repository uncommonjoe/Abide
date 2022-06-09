import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

import useAuthentication from '../utils/hooks/useAuthentication';
import userSettings from '../utils/hooks/userSettings';
import userReadings from '../utils/hooks/userReadings';

import UserStack from './userStack';
import AuthStack from './authStack';
import TrackStack from './trackStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootNavigation = () => {
	const [state, setState] = useState('');
	const { user } = useAuthentication();
	const { usrSettngs } = userSettings();
	const { usrReadings } = userReadings();

	global.user = user;
	global.usrSettngs = usrSettngs;
	global.userReadings = usrReadings;
	global.planTitle = '2022-2023';

	const noTrack = isEmpty(usrSettngs);

	// console.warn(noTrack)
	// console.log(user)
	// console.warn(userReadings);

	useEffect(() => {
		session();
	}, [])

	const session = async () => {
		let token = await AsyncStorage.getItem("Token");
		setState(token);
	};

	// console.log(state.uid);

	if (user) {
		if (noTrack) {
			return <TrackStack />;
		} else {
			return <UserStack />;
		}
	} else {
		return <AuthStack />;
	}
};

export default RootNavigation;
