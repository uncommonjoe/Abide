import React, { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';

import useAuthentication from '../utils/hooks/useAuthentication';
import userSettings from '../utils/hooks/userSettings';
import userReadings from '../utils/hooks/userReadings';

import UserStack from './userStack';
import AuthStack from './authStack';

const RootNavigation = () => {
	const { user } = useAuthentication();
	const { usrSettngs } = userSettings();
	const { usrReadings } = userReadings();
	global.user = user;
	global.usrSettngs = usrSettngs;
	global.userReadings = usrReadings;
	global.planTitle = '2022-2023';

	console.log(userReadings);

	return user ? <UserStack /> : <AuthStack />;

	// if (user.uid && !usrSettngs.tier) {
	// 	console.log('a');
	// 	return <SelectTrackModal />;
	// }
	// if (user.uid && usrSettngs.tier) {
	// 	console.log('b');
	// 	return <UserStack />;
	// } else {
	// 	console.log('c');
	// 	return <AuthStack />;
	// }
};

export default RootNavigation;
