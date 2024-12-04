import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert } from "react-native";
import Draggable from "react-native-draggable";
import Menu from "./Menu";
const App = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [pocionBotonDrag, setPocionBotonDrag] = useState({ x: 0, y: 0 });
  useEffect(() => {
    setMenuVisible(false);
    setPocionBotonDrag({ x: 343, y: 807 });
    console.log("Pocicionamiento incial", pocionBotonDrag);
  }, []);

  const handlePressT = () => {
    if (menuVisible) {
      setMenuVisible(false);
      console.log("tocando el btn", menuVisible);
    } else {
      setMenuVisible(true);
      console.log("tocando el btn", menuVisible);
    }
  };
  const handleDragRelease = (event, gestureState, bounds) => {
    const { moveX, moveY } = gestureState;
    setPocionBotonDrag({ x: moveX, y: moveY });
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
        bounds="parent"
        onPressOut={handlePressT}
        onDragRelease={handleDragRelease}
      />
      {menuVisible ? (
        <Menu pocionBotonDrag={pocionBotonDrag} />
      ) : (
        <Text>Touche the bottom to see the menu</Text>
      )}
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
