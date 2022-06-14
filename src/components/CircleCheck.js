import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { updateReadingStatus } from "../config/firebase";
import userReadings from "../utils/hooks/userReadings";

const CircleCheck = ({ isComplete, color, readingObj, onChange }) => {
  //   const [isChecked, updateIsChecked] = useState(isComplete);

  const selectHandler = async () => {
    //updateIsChecked((prevCheck) => !prevCheck);
    //const toggle = React.useCallback(() => setIsToggled(!isToggled));
    //updateIsChecked(toggle);
    // updateIsChecked(!isComplete);
    onChange(!isComplete);
    if (readingObj) {
      let props = {
        ...readingObj,
        uid: global.user.uid,
        isComplete: !isComplete,
      };
      await updateReadingStatus(props);
      // if (props.isComplete) {
      // global.userReadings = [...global.userReadings, props];
      let index = global.userReadings.findIndex(
        (val) =>
          val.date == readingObj.date && val.reading == readingObj.reading
      );
      if (index >= 0) global.userReadings.splice(index, 1, props);
      else global.userReadings.splice(index, 0, props);
    }
    // else {
    //   let index = global.userReadings.findIndex(
    //     (val) =>
    //       val.date == readingObj.date &&
    //       val.reading == readingObj.reading &&
    //       global.user.uid == readingObj.uid
    //   );
    //   if (index >= 0) global.userReadings.splice(index, 1);
    // }


    // const hello = () => {
    //   const { usrReadings } = userReadings();
    //   global.userReadings = usrReadings;
    //   global.planTitle = "2022-2023";
    // };
    // hello();
  };

  return (
    <Pressable
      key={isComplete}
      style={[styles.circle, { borderColor: color }]}
      onPress={() => selectHandler()}
    >
      <Text>
        {isComplete ? (
          <View style={styles.icon}>
            <FontAwesomeIcon icon={faCheck} color={color} size={20} />
          </View>
        ) : (
          ""
        )}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circle: {
    borderWidth: 1,
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    paddingTop: 9,
  },
});

export default CircleCheck;
