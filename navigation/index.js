import React, { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';

import { useAuthentication } from '../src/utils/hooks/useAuthentication';
import { getTier } from '../src/config/firebase';

import UserStack from './serStack';
import AuthStack from './authStack';
import SelectTrackModal from '../src/pages/users/SelectTrackModal';
import { initial } from 'lodash';

const RootNavigation = () => {
	const [isLoading, setLoading] = useState(true);
	const [userObj, setUserObj] = useState({
		id: '',
		tier: '',
	});
	const componentMounted = useRef(true);
	const { user } = useAuthentication();

	const getUserTier = async (user) => {
		// Get user tier from db
		// const tier = await getTier(user);
		// return {
		// 	id: user.uid,
		// 	tier: tier,
		// };
	};

	useEffect(async () => {
		// setLoading(true);
		// var response = await getUserTier(user);
		// setUserObj(response);
		// setLoading(false);
		// if (componentMounted.current) {
		// 	setUserObj(response);
		// }
		// return () => {
		// 	// This code runs when component is unmounted
		// 	componentMounted.current = false;
		// };
	});

	// this goes in an infinite loop
	//console.log(userObj);

	//return user ? <UserStack /> : <AuthStack />;

	return user ? <UserStack /> : <AuthStack />;

	// if (userObj.id && !userObj.tier) {
	// 	console.log('a');
	// 	return <SelectTrackModal />;
	// }
	// if (userObj.id && userObj.tier) {
	// 	console.log('b');
	// 	return <UserStack />;
	// } else {
	// 	console.log('c');
	// 	return <AuthStack />;
	// }
};

export default RootNavigation;
