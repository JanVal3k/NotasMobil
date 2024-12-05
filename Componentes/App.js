import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Draggable from "react-native-draggable";
import Menu from "./Menu";
const App = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  useEffect(() => {
    setMenuVisible(false);
  }, []);

  const handlePress = () => {
    if (menuVisible) {
      setMenuVisible(false);
    } else {
      setMenuVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Draggable
        x={310}
        y={750}
        renderSize={56}
        renderColor="#F1AC20"
        isCircle
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
            <Text style={styles.Ctexto}>≡</Text>
          </View>
        }
      />
      {menuVisible ? <Menu /> : <Text></Text>}
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
  Ctexto: {
    color: "#fff",
    fontSize: 34,
  },
});
export default App;
