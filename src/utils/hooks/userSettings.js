import React, { useEffect, useState } from "react";
import useAuthentication from "./useAuthentication";
import { getUserSettings } from "../../config/firebase";

const userSettings = (user, callback = () => {}) => {
  //   const [usrSettngs, setUserSettings] = useState({});
  //   const { user } = useAuthentication();
  //   const user = null;
  //   useEffect(() => {
  // if (user && user !== null) {
  const fetchData = async () => {
    const response = await getUserSettings(user);
    callback(response);
    // setUserSettings(response);
    return response;
  };
  fetchData();
  // }
  //   }, []);

  // return { usrSettngs };
};

export default userSettings;
