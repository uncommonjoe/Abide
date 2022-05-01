// Guide to installing Firebase with React Native
// https://blog.logrocket.com/integrating-firebase-authentication-expo-mobile-app

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	collection,
	getDocs,
	addDoc,
	query,
	where,
} from 'firebase/firestore';

import 'firebase/auth';
import Constants from 'expo-constants';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
	apiKey: Constants.manifest?.extra?.firebaseApiKey,
	authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
	projectId: Constants.manifest?.extra?.firebaseProjectId,
	storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
	messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
	appId: Constants.manifest?.extra?.firebaseAppId,
	measurementId: Constants.manifest?.extra?.measurementId,
};

// Initialize Firebase

const auth = initializeApp(firebaseConfig);
const db = getFirestore(auth);

export const addTrack = async (props) => {
	if (props) {
		try {
			const docRef = await addDoc(collection(db, 'users'), {
				uid: props.user.uid,
				name: props.user.displayName,
				tier: props.option,
			});
			console.log('Document written with ID: ', docRef.id);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	}
};

export const getTier = async (user) => {
	let userObj;
	if (user) {
		try {
			const q = query(
				collection(db, 'users'),
				where('uid', '==', user.uid)
			);

			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				userObj = doc.data();
			});
		} catch (e) {
			console.error('Error getting document: ', e);
		}
		return userObj;
	}
};
