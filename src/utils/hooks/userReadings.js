import React, { useEffect, useState } from 'react';
import useAuthentication from './useAuthentication';
import { getUserReadings } from '../../config/firebase';

const userReadings = () => {
	const [userReadings, setUserReadings] = useState({});
	const { user } = useAuthentication();

	useEffect(() => {
		if (user && user !== null) {
			const fetchData = async () => {
				const response = await getUserReadings(user);
				setUserReadings(response);
				return response;
			};
			fetchData();
		}
	}, [user]);

	return { userReadings };
};

export default userReadings;
