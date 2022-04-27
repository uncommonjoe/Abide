import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { useAuthentication } from '../src/utils/hooks/useAuthentication';
import { getTrack } from '../src/config/firebase';

import UserStack from './serStack';
import AuthStack from './authStack';
import SelectTrackModal from '../src/pages/users/SelectTrackModal';

export default function RootNavigation() {
	const user = useAuthentication();

	return user ? <UserStack /> : <AuthStack />;

	// let response;
	// let id;
	// let tier;

	// const getUserTrack = async (user) => {
	// 	try {
	// 		response = await getTrack(user);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// 	return response;
	// };

	// useEffect(() => {
	// 	Promise.all([user]).then((responses) => {
	// 		getUserTrack(responses[0].user).then((userObj) => {
	// 			id = user.user.uid;
	// 			tier = userObj.tier;
	// 			console.log('user ', user.user.uid);
	// 			console.log('obj ', userObj.tier);
	// 		});
	// 	});
	// });

	// This doesn't work and I can't figure out why!
	// "Uncaught TypeError: Cannot read properties of undefined (reading 'state')""

	// console.log('id ', this.state.id);
	// console.log('tier ', this.state.tier);
	// if (id && !tier) {
	// 	console.log('a');
	// 	return <SelectTrackModal />;
	// }
	// if (id && tier) {
	// 	console.log('b');
	// 	return <UserStack />;
	// } else {
	// 	console.log('c');
	// 	return <AuthStack />;
	// }
}
