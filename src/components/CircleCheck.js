import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { updateReadingStatus } from "../config/firebase";

const CircleCheck = ({ isComplete, color, readingObj, onChange }) => {
  //   const [isChecked, updateIsChecked] = useState(isComplete);

  const selectHandler = () => {
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

      return updateReadingStatus(props);
    }
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
