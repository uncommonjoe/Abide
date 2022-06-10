import React, { useEffect, useState } from "react";
import useAuthentication from "./useAuthentication";
import { getUserSettings } from "../../config/firebase";

const userSettings = (user, callback = () => {}) => {
  //   const [usrSettngs, setUserSettings] = useState({});
  //   console.warn("dsfknfsdfjn", user);
  //   const { user } = useAuthentication();
  //   const user = null;
  //   useEffect(() => {
  // if (user && user !== null) {
  // console.warn("dsfknfsdfjn", user);
  const fetchData = async () => {
    const response = await getUserSettings(user);
    callback(response);
    // setUserSettings(response);
    return response;
  };
  //   console.warn("dsfknfsdfjn");
  fetchData();
  // }
  //   }, []);

  // return { usrSettngs };
};

export default userSettings;
