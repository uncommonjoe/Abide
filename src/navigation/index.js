import React from 'react';
import { isEmpty } from 'lodash';

import useAuthentication from '../utils/hooks/useAuthentication';
import userSettings from '../utils/hooks/userSettings';
import userReadings from '../utils/hooks/userReadings';

import UserStack from './userStack';
import AuthStack from './authStack';
import TrackStack from './trackStack';

const RootNavigation = () => {
	const { user } = useAuthentication();
	const { usrSettngs } = userSettings();
	const { usrReadings } = userReadings();

	global.user = user;
	global.usrSettngs = usrSettngs;
	global.userReadings = usrReadings;
	global.planTitle = '2022-2023';

	const noTrack = isEmpty(usrSettngs);
	console.log(userReadings);

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
