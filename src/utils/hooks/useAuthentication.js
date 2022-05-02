import React, { useEffect, useState, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

const useAuthentication = () => {
	const [user, setUser] = useState();

	useEffect(() => {
		const unsubscribeFromAuthStatuChanged = onAuthStateChanged(
			auth,
			(user) => {
				if (user) {
					// User is signed in, see docs for a list of available properties
					// https://firebase.google.com/docs/reference/js/firebase.User
					setUser(user);
				} else {
					// User is signed out
					setUser(undefined);
				}
				//setUser(undefined); // set user to undefined to get to the signup screen
			}
		);

		return unsubscribeFromAuthStatuChanged;
	}, []);

	return { user };
};

export default useAuthentication;
