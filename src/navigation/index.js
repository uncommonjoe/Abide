import React, { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';

import useAuthentication from '../utils/hooks/useAuthentication';
import userSettings from '../utils/hooks/userSettings';

import UserStack from './userStack';
import AuthStack from './authStack';
import SelectTrackModal from '../pages/users/SelectTrackModal';

const RootNavigation = () => {
	const { user } = useAuthentication();
	const { usrSettngs } = userSettings();
	global.user = user;
	global.usrSettngs = usrSettngs;

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
