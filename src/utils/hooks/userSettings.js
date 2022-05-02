import React, { useEffect, useState, useRef } from 'react';
import useAuthentication from './useAuthentication';
import { getUserSettings } from '../../config/firebase';

const userSettings = () => {
	const [usrSettngs, setUserSettings] = useState({});
	const { user } = useAuthentication();

	useEffect(() => {
		if (user && user !== null) {
			const fetchData = async () => {
				const response = await getUserSettings(user);
				setUserSettings(response);
				return response;
			};
			fetchData();
		}
	}, [user]);

	return { usrSettngs };
};

export default userSettings;
