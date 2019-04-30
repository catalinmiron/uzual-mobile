import React from "react";
import { View, ActivityIndicator } from "react-native";
import { MonoText } from "../StyledText";
import Colors from "../../constants/Colors";

export default ({style}) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center", ...style }}>
    {/* <ActivityIndicator size="large" color={Colors.grey} /> */}
    <MonoText style={{color: Colors.midGrey}} >Loading...</MonoText>
  </View>
);