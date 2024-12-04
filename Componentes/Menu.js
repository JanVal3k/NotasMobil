import { StyleSheet, Text, View } from "react-native";
import Draggable from "react-native-draggable";
const Menu = () => {
  return (
    <>
      <Draggable
        x={315}
        y={520}
        renderSize={46}
        isCircle
        shouldReverse
        renderColor="#4165D5"
        renderText="📝"
      />
      <Draggable
        x={315}
        y={577}
        renderSize={46}
        isCircle
        shouldReverse
        renderColor="#4165D5"
        renderText="📝+"
      />
      <Draggable
        x={315}
        y={635}
        renderSize={46}
        isCircle
        shouldReverse
        renderColor="#4165D5"
        renderText="📅"
      />
      <Draggable
        x={315}
        y={690}
        renderSize={46}
        isCircle
        shouldReverse
        renderColor="#4165D5"
        renderText="⚙️"
      />
    </>
  );
};

export default Menu;
