import React, { useEffect, useState } from 'react';
import useAuthentication from './useAuthentication';
import { getUserSettings } from '../../config/firebase';

const userSettings = () => {
	const [usrSettngs, setUserSettings] = useState({});
	const { user } = useAuthentication();

	// console.warn('==> ', user.uid)

	useEffect(() => {
		if (user && user !== null) {
			const fetchData = async () => {
				const response = await getUserSettings(user);
				console.log('USER ', response)
				setUserSettings(response);
				return response;
			};
			fetchData();
		}
	}, [user]);

	return { usrSettngs };
};

export default userSettings;
