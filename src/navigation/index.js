import React, { useState } from "react";
import { isEmpty } from "lodash";

import useAuthentication from "../utils/hooks/useAuthentication";
import userSettings from "../utils/hooks/userSettings";
import userReadings from "../utils/hooks/userReadings";

import UserStack from "./userStack";
import AuthStack from "./authStack";
import TrackStack from "./trackStack";
import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const RootNavigation = () => {
  const [isUser, setIsUser] = useState(false);
  const [isTrack, setIsTrack] = useState(false);
  const [loading, setLoading] = useState(true);
  const { usrReadings } = userReadings();
  global.userReadings = usrReadings;
  global.planTitle = "2022-2023";

  const Stack = createNativeStackNavigator();

  useAuthentication((user) => {
    if (user) {
      console.warn("hello", user);
      userSettings(user, (res) => {
        console.warn("hello world", res);
        setIsUser(true);
        setIsTrack(isEmpty(res));
        setLoading(false);
        global.usrSettngs = res;
        global.user = user;
      });
    } else {
      setLoading(false);
    }
  });

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  return (
    <Stack.Navigator
      initialRouteName={
        isUser && isTrack ? "TrackStack" : isUser ? "UserStack" : "AuthStack"
      }
    >
      <Stack.Screen
        name="TrackStack"
        component={TrackStack}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="UserStack"
        component={UserStack}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
  //   if (isUser) {
  //     if (isTrack) {
  //       return <TrackStack />;
  //     } else {
  //       return <UserStack />;
  //     }
  //   } else {
  //     return <AuthStack />;
  //   }
};

export default RootNavigation;
