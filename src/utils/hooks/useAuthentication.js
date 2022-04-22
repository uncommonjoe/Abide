import React from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

const auth = getAuth();

export function useAuthentication() {
	const [user, setUser] = React.useState();

	React.useEffect(() => {
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

	return {
		user,
	};
}
