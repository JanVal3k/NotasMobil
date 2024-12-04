import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert } from "react-native";
import Draggable from "react-native-draggable";
import Menu from "./Menu";
const App = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    setMenuVisible(false);
  }, []);

  const handlePress = () => {
    setMenuVisible(true);
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {menuVisible ? <Menu /> : <Text>Error</Text>}
      <Draggable
        x={310}
        y={750}
        renderSize={56}
        renderColor="#F1AC20"
        isCircle
        shouldReverse
        onShortPressRelease={handlePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c3e8c9",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default App;
