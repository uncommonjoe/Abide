import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Text, TitleText } from "../assets/styles/Text";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import CircleCheck from "./CircleCheck";

//https://docs.expo.dev/guides/using-custom-fonts/
// import {
// 	Montserrat_400Regular,
// 	Montserrat_500Medium,
// 	Montserrat_700Bold,
// } from '@expo-google-fonts/montserrat';

const Header = ({
  title,
  onChange = () => {},
  onSoundPress = () => {},
  loading = false,
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title.passage}</Text>

      <View style={styles.buttonsWrap}>
        <TouchableOpacity
          style={styles.button}
          onPress={onSoundPress}
          color="blue"
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <FontAwesomeIcon icon={faVolumeHigh} color={"#454C57"} size={36} />
          )}
        </TouchableOpacity>

        <CircleCheck
          isComplete={title.isComplete}
          readingObj={title}
          color={"#454C57"}
          onChange={onChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F3F2F8",
    width: "100%",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    color: "#454C57",
    //fontFamily: Montserrat_700Bold,
    fontSize: 24,
    textTransform: "uppercase",
  },
  buttonsWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "transparent",
    marginHorizontal: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    marginLeft: 10,
    //fontFamily: Montserrat_700Bold,
    textTransform: "uppercase",
  },
});

export default Header;
