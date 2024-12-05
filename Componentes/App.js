import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import Draggable from "react-native-draggable";
import Menu from "./Menu";
import Menu2 from "./Menu2";

const App = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    setMenuVisible(false);
  }, []);

  const handlePress = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Menu2 />
      </View>
      <Draggable
        x={310}
        y={750}
        renderSize={60}
        renderColor="#F1AC20"
        isCircle
        renderText=" "
        shouldReverse
        onPressOut={handlePress}
        children={
          <View
            style={{
              color: "red",
              width: 60,
              height: 60,
              borderRadius: 20,
              backgroundColor: "#F1AC20",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.txtBoton}>≡</Text>
          </View>
        }
      />
      {menuVisible && <Menu />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c3e8c9",
    justifyContent: "center",
    alignItems: "center",
  },
  txtBoton: {
    top: -5,
    color: "#fff",
    fontSize: 50,
  },
});

export default App;
