import React, { useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Scripture from "../../components/Scripture";
import page from "../../assets/styles/page.style";
import Header from "../../components/Header";

const ReadScreen = ({ route }) => {
  const [readingObj, setReadingObj] = useState(route.params.reading);
  //   const readingObj = route.params.reading;
  const onChange = route.params.onChange;
  const index = route.params.index;

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={readingObj}
        onChange={(isComplete) => {
          setReadingObj({ ...readingObj, isComplete: !readingObj.isComplete });
          onChange(isComplete, index, {
            ...readingObj,
            isComplete: !readingObj.isComplete,
          });
        }}
        index={index}
      />
      <ScrollView
        style={[page.container, styles.background]}
        contentInsetAdjustmentBehavior="automatic"
      >
        <SafeAreaView>
          <StatusBar style="dark" />

          <Scripture reading={readingObj} />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
  },
});

export default ReadScreen;
