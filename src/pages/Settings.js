import React from "react";
import { View, SafeAreaView, TouchableOpacity, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { TitleText } from "../assets/styles/Text";
import button from "../assets/styles/button.style";
import page from "../assets/styles/page.style";
import useAuthentication from "../utils/hooks/useAuthentication";
import { signOut, getAuth } from "firebase/auth";
import NavService from "../navigation/NavService";

export default function Settings(props) {
  const { user } = useAuthentication();
  const auth = getAuth();

  return (
    <View
      style={[
        page.container,
        {
          height: 100,
          width: "100%",
          backgroundColor: "#454C57",
        },
      ]}
    >
      <SafeAreaView>
        <StatusBar style="dark" />

        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "500",
            textTransform: "uppercase",
            marginBottom: 25,
          }}
        >
          Hello {user?.displayName}
        </Text>

        <View style={page.section}>
          <TouchableOpacity
            style={[button.button, button.green]}
            onPress={() => {
              signOut(auth);
              global.usrSettngs = null;
              global.user = null;
              global.userReadings = [];
              NavService.resetStack("AuthStack");
            }}
          >
            <Text style={[button.text, { color: "white" }]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
