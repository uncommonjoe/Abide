import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHouse,
  faToolbox,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransitionPresets } from "@react-navigation/stack";
import Header from "../components/Header";

// Pages
import HomePage from "../pages/Home";
import ReadScreen from "../pages/scriptures/ReadScreen";
import Toolbox from "../pages/Toolbox";
import ToolboxModal from "../pages/toolbox/ToolboxModal";
import Settings from "../pages/Settings";
import SelectTrackScreen from "../pages/users/SelectTrackScreen";

const Home = createNativeStackNavigator();
const ToolboxStack = createNativeStackNavigator();
const BottomNavigation = createBottomTabNavigator();

export default function UserStack() {
  const [headerTitle, setHeaderTitle] = useState("Abide");

  var homeStack = () => (
    <Home.Navigator
      screenOptions={() => ({
        gestureEnabled: true,
      })}
      initialRouteName="Home"
    >
      <Home.Screen
        name="Home"
        options={{
          header: () => null,
        }}
      >
        {(props) => <HomePage {...props} setHeaderTitle={setHeaderTitle} />}
      </Home.Screen>
      <Home.Screen
        name="Read"
        component={ReadScreen}
        options={{
          header: () => null,
        }}
        // options={{
        //   header: () => <Header title={headerTitle} />,
        // }}
      />
      <Home.Screen
        name="Select Track"
        component={SelectTrackScreen}
        options={{
          header: () => null,
        }}
      />
    </Home.Navigator>
  );

  var toolboxStack = () => (
    <ToolboxStack.Navigator
      screenOptions={() => ({
        gestureEnabled: true,
      })}
    >
      <ToolboxStack.Screen
        name="Toolbox"
        component={Toolbox}
        options={{
          header: () => null,
        }}
      />
      <ToolboxStack.Screen
        name="Toolbox Modal"
        component={ToolboxModal}
        options={{
          header: () => null,
          presentation: "modal",
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
    </ToolboxStack.Navigator>
  );

  return (
    <BottomNavigation.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#F0F0F0",
          justifyContent: "center",
          height: 85,
        },
        tabBarActiveTintColor: "#454C57",
      }}
    >
      <BottomNavigation.Screen
        name="Main"
        children={homeStack}
        options={{
          headerShown: false,
          hideTabBar: true,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHouse} color={color} size={size} />
          ),
        }}
      />

      <BottomNavigation.Screen
        name="Toolbox"
        children={toolboxStack}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faToolbox} color={color} size={size} />
          ),
        }}
      />
      <BottomNavigation.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faSliders} color={color} size={size} />
          ),
        }}
      />
    </BottomNavigation.Navigator>
  );
}
