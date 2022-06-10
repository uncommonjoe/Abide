// Guide to installing Firebase with React Native
// https://blog.logrocket.com/integrating-firebase-authentication-expo-mobile-app

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  addDoc,
  query,
  where,
  doc,
} from "firebase/firestore";

import "firebase/auth";

import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from "@env";

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_APP_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase

const auth = initializeApp(firebaseConfig);
const db = getFirestore(auth);

export const addTrack = async (props) => {
  if (props) {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        uid: props.user.uid,
        name: props.user.displayName,
        track: props.option,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
};

export const getUserSettings = async (user) => {
  let userObj;
  if (user) {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        userObj = doc.data();
      });
    } catch (e) {
      console.error("Error getting document: ", e);
    }
    return userObj;
  }
};

export const updateReadingStatus = (props) => {
  if (props) {
    try {
      const docData = { ...props };
      setDoc(
        doc(
          db,
          "readings",
          props.date + "-" + props.reading + "-" + props.plan + "-" + props.uid
        ),
        docData
      );
    } catch (e) {
      console.error("Error updating reading: ", e);
    }
  } else {
    console.error(
      "'props' or 'match' wasn't defined in firebase.js in _updateReading method"
    );
  }
};

export const getUserReadings = async (user) => {
  const readings = [];
  if (user) {
    try {
      const q = query(collection(db, "readings"), where("uid", "==", user.uid));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        readings.push(doc.data());
      });
      console.log(readings);
      return readings;
    } catch (e) {
      console.error("Error getting document: ", e);
    }
  } else {
    console.error(
      "'user' wasn't defined in firebase.js in getUserReadings method"
    );
  }
};

export const getToolbox = async () => {
	const toolbox = [];

	try {
		const q = query(collection(db, 'toolbox'));

		const querySnapshot = await getDocs(q);

		querySnapshot.forEach((doc) => {
			toolbox.push(doc.data());
		});
		console.log(toolbox);
		return toolbox;
	} catch (e) {
		console.error('Error getting toolbox: ', e);
	}
};
