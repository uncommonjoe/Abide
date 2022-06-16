import React from "react";
import "./src/config/firebase";
import RootNavigation from "./src/navigation";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import NavService from "./src/navigation/NavService";
import { Store } from "./src/redux";
import { Provider } from "react-redux";
import { View } from "react-native";

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer ref={(ref) => NavService.setTopLevelNavigator(ref)}>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
}
