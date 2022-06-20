import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  faHouse,
  faToolbox,
  faSliders,
  faPlay,
  faPause,
  faClose,
  faArrowRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Text } from "../assets/styles/Text";

import HomePage from "../pages/Home";
import ReadScreen from "../pages/scriptures/ReadScreen";
import Toolbox from "../pages/Toolbox";
import ToolboxModal from "../pages/toolbox/ToolboxModal";
import Settings from "../pages/Settings";
import TranslationScreen from "../pages/settings/TranslationScreen";
import SelectTrackScreen from "../pages/users/SelectTrackScreen";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransitionPresets } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { PlayerAction } from "../redux/Actions";

const Home = createNativeStackNavigator();
const ToolboxStack = createNativeStackNavigator();
const SettingzStack = createNativeStackNavigator();

const BottomSheet = ({ bottomSheetRef, children }) => {
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        handleIndicatorStyle={{ backgroundColor: "#454C57" }}
        ref={bottomSheetRef}
        snapPoints={["30%", "50%", "95%"]}
        onDismiss={() => {
          bottomSheetRef.current.dismiss();
        }}
        enablePanDownToClose={true}
        // onAnimate={() => console.log("on animate")}
        backgroundStyle={{
          backgroundColor: "white",
          shadowColor: "#454C57",
          shadowRadius: 10,
          shadowOpacity: 0.2,
          borderRadius: 0,
        }}
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
    <BottomSheet bottomSheetRef={bottomSheetRef1} children={SettingsStack} />
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
        }}
      />
    </ToolboxStack.Navigator>
  </NavigationContainer>
);

var SettingsStack = () => (
  <NavigationContainer independent={true}>
    <SettingzStack.Navigator
      screenOptions={() => ({
        gestureEnabled: true,
      })}
    >
      <SettingzStack.Screen
        name="Settings"
        component={Settings}
        options={{
          header: () => null,
        }}
      />
      <SettingzStack.Screen
        name="Translation"
        component={TranslationScreen}
        options={{
          header: () => null,
        }}
      />
    </SettingzStack.Navigator>
  </NavigationContainer>
);

function BottomTab() {
  const Tab = createBottomTabNavigator();
  const [play, setPlay] = useState(true);
  const bottomSheetRef1 = useRef(null);
  const bottomSheetRef2 = useRef(null);
  const playerRef = useRef(null);
  const milliSeconds = useRef(0);
  const [headerTitle, setHeaderTitle] = useState("Abide");
  const [focus, setFocus] = useState("Home");
  const soundFile = useSelector((state) => state.PlayerReducer.sound);
  const dispatch = useDispatch();
  // const [sound, setSound] = useState(initialState);
  //console.warn('sound', soundFile.name);

  const onPlay = async () => {
    await playerRef.current.playAsync();
    setPlay(true);
  };

  const onPause = async () => {
    await playerRef.current.pauseAsync();
    setPlay(false);
  };

	const onReplay = async () => {
		//console.warn('jd', milliSeconds.current);
		await playerRef.current.setPositionAsync(milliSeconds.current - 10000);
	};

  const onClose = async () => {
    dispatch(PlayerAction.SetSound(null));
    setPlay(true);
    await playerRef.current.unloadAsync();
  };

  useEffect(() => {
    if (soundFile) {
      const play = async () => {
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
          interruptionModeAndroid: InterruptionModeIOS.DoNotMix,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: true,
          allowsRecordingIOS: false,
          interruptionModeIOS: InterruptionModeAndroid.DoNotMix,
          playsInSilentModeIOS: true,
        });
        const { sound } = await Audio.Sound.createAsync(
          { uri: soundFile.url },
          { shouldPlay: true }
        );
        playerRef.current = sound;
        sound.setOnPlaybackStatusUpdate((val) => {
          milliSeconds.current = val.positionMillis;
        });
      };
      play();
    }
    return () => {
      bottomSheetRef1.current.dismiss();
      bottomSheetRef2.current.dismiss();
    };
  }, [soundFile]);

  const BottomTabComp = ({ props }) => {
    const [focus, setFocus] = useState("Home");
    return props.state.routes.map((val, index) => (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          if (index == 2) {
            bottomSheetRef2.current.dismiss();
            setTimeout(() => {
              bottomSheetRef1.current.present();
            }, 300);
            setFocus("Setting");
            return;
          }
          if (index == 1) {
            bottomSheetRef1.current.dismiss();
            setTimeout(() => {
              bottomSheetRef2.current.present();
            }, 300);
            setFocus("Toolbox");
            return;
          } else {
            props.navigation.navigate("Home");
            setFocus("Home");
          }
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
          icon={index == 0 ? faHouse : index == 1 ? faToolbox : faSliders}
          color={
            focus == "Home" && index == 0
              ? "#424142"
              : focus == "Toolbox" && index == 1
              ? "#424142"
              : focus == "Setting" && index == 2
              ? "#424142"
              : "#A29FA2"
          }
          size={32}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Tab.Navigator
        tabBar={(props) => {
          return (
            <>
              {soundFile ? (
                <View
                  style={{
                    width: "100%",
                    height: 80,
                    backgroundColor: "white",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    ...styles.shadow,
                  }}
                >
                  <TouchableOpacity onPress={onClose}>
                    <FontAwesomeIcon icon={faClose} color={"#000"} size={28} />
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
                    <Text
                      style={{
                        textTransform: "uppercase",
                      }}
                    >
                      {headerTitle.passage}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "25%",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity onPress={onReplay}>
                      <FontAwesomeIcon
                        icon={faArrowRotateLeft}
                        color={"#000"}
                        size={28}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => (play ? onPause() : onPlay())}
                    >
                      <FontAwesomeIcon
                        icon={play ? faPause : faPlay}
                        color={"#000"}
                        size={28}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
              <SafeAreaView
                style={{
                  height: 80,
                  paddingTop: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  borderTopWidth: 0,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <BottomTabComp props={props} />
              </SafeAreaView>
            </>
          );
        }}
        tabBarOptions={{
          showLabel: false,
          keyboardHidesTabBar: true,
        }}
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
        <Tab.Screen
          name="Settings"
          component={SettingsStack}
          headerShown={false}
        />
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
