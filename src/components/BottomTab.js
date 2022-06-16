import React, { useState, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  faHouse,
  faToolbox,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import HomePage from "../pages/Home";
import ReadScreen from "../pages/scriptures/ReadScreen";
import Toolbox from "../pages/Toolbox";
import ToolboxModal from "../pages/toolbox/ToolboxModal";
import Settings from "../pages/Settings";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import SelectTrackScreen from "../pages/users/SelectTrackScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransitionPresets } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Home = createNativeStackNavigator();
const ToolboxStack = createNativeStackNavigator();

const BottomSheet = ({ bottomSheetRef, children }) => {
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        handleIndicatorStyle={{ backgroundColor: "#fff" }}
        ref={bottomSheetRef}
        snapPoints={["50%", "90%"]}
        onDismiss={() => {
          bottomSheetRef.current.dismiss();
        }}
        enablePanDownToClose={true}
        onAnimate={() => console.log("on animate")}
        backgroundStyle={{ backgroundColor: "#454C57" }}
      >
        {children}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

var HomeStack = ({ setHeaderTitle, bottomSheetRef1, bottomSheetRef2 }) => (
  <>
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
    <BottomSheet bottomSheetRef={bottomSheetRef1} children={Settings} />
    <BottomSheet bottomSheetRef={bottomSheetRef2} children={ToolBoxStack} />
  </>
);

var ToolBoxStack = () => (
  <NavigationContainer independent={true}>
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
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
    </ToolboxStack.Navigator>
  </NavigationContainer>
);

function BottomTab() {
  const Tab = createBottomTabNavigator();
  const [modal, setModal] = useState(false);
  const bottomSheetRef1 = useRef(null);
  const bottomSheetRef2 = useRef(null);
  const [headerTitle, setHeaderTitle] = useState("Abide");
  const sound = useSelector((state) => state.PlayerReducer.sound);
  console.warn("sound", sound);
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={(props) => {
          return (
            <>
              <View
                style={{
                  width: "100%",
                  height: 80,
                  backgroundColor: "#fff",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 20,
                }}
              >
                <TouchableOpacity>
                  <FontAwesomeIcon icon={faHouse} color={"#000"} size={32} />
                </TouchableOpacity>
                <View
                  style={{
                    position: "absolute",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    zIndex: -1,
                  }}
                >
                  <Text>2 Cors 10:1</Text>
                  <Text>2 Cors</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "25%",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity>
                    <FontAwesomeIcon icon={faHouse} color={"#000"} size={32} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <FontAwesomeIcon icon={faHouse} color={"#000"} size={32} />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  height: 80,
                  paddingTop: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  borderTopWidth: 0,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {props.state.routes.map((val, index) => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      // console.warn("index", index, val.name);
                      if (index == 2) {
                        bottomSheetRef1.current.present();
                        bottomSheetRef2.current.dismiss();
                        return;
                      }
                      if (index == 1) {
                        bottomSheetRef2.current.present();
                        bottomSheetRef1.current.dismiss();
                        return;
                      } else props.navigation.navigate("Home");
                    }}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                      height: "100%",
                      // width: "33%",
                      // padding: 10
                    }}
                  >
                    <FontAwesomeIcon
                      icon={
                        index == 0
                          ? faHouse
                          : index == 1
                          ? faToolbox
                          : faSliders
                      }
                      color={props.state.index == index ? "blue" : "#000"}
                      size={32}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </>
          );
        }}
        tabBarOptions={{ showLabel: false, keyboardHidesTabBar: true }}
        screenOptions={({ route }) => ({
          headerShown: false,
          activeTintColor: "blue",
          inactiveTintColor: "gray",
          style: {
            borderTopWidth: 0,
            elevation: 0,
            ...styles.shadow,
          },
          keyboardHidesTabBar: true,
          tabBarStyle: {
            height: 70,
            paddingHorizontal: 5,
            paddingTop: 0,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            // position: 'absolute',
            borderTopWidth: 0,
          },
        })}
      >
        <Tab.Screen
          name="Main"
          children={() => (
            <HomeStack
              setHeaderTitle={setHeaderTitle}
              bottomSheetRef1={bottomSheetRef1}
              bottomSheetRef2={bottomSheetRef2}
            />
          )}
          headerShown={false}
        />
        <Tab.Screen
          name="Toolbox"
          component={ToolBoxStack}
          // children={() => <></>}
          headerShown={false}
        />
        <Tab.Screen name="Settings" children={() => null} headerShown={false} />
      </Tab.Navigator>
    </View>
  );
}
export default BottomTab;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15.5,
    elevation: 5,
  },
  customStyle: {
    height: 52,
    width: 52,
  },
});
