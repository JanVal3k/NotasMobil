import { StyleSheet, Text, View } from "react-native";
import Draggable from "react-native-draggable";

const Menu = ({ pocionBotonDrag }) => {
  console.log(
    "Pocioconamiento con las props",
    " X:",
    Math.trunc(pocionBotonDrag.x),
    " y:",
    Math.trunc(pocionBotonDrag.y)
  );
  return (
    <Draggable
      x={Math.trunc(pocionBotonDrag.x)}
      y={Math.trunc(pocionBotonDrag.y)}
      bounds="parent"
      children={
        <View style={style.Menu}>
          <Text style={style.MenuText}>Hola mundo</Text>
        </View>
      }
    />
  );
};
const style = StyleSheet.create({
  Menu: {
    borderRadius: 10,
    backgroundColor: "#4165D5",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 80, //80
    right: 95, //95
  },
  MenuText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default Menu;
