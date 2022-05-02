import React, { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';

import useAuthentication from '../src/utils/hooks/useAuthentication';
import userSettings from '../src/utils/hooks/userSettings';

import UserStack from './serStack';
import AuthStack from './authStack';
import SelectTrackModal from '../src/pages/users/SelectTrackModal';

const RootNavigation = () => {
	const { user } = useAuthentication();
	const { usrSettngs } = userSettings();

	console.log('settings ', usrSettngs);

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
