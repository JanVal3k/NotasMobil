import React, { useState } from "react";
import { View, Text } from "react-native";
import { FAB, Portal, Provider } from "react-native-paper";

const Menu2 = () => {
  const [open, setOpen] = useState(true);

  const onStateChange = ({ open: newOpen }) => {
    console.log("onStateChange llamado, nuevo valor:", newOpen);
    setOpen(newOpen);
  };

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? "close" : "plus"}
          actions={[
            {
              icon: "plus",
              label: "Add",
              onPress: () => console.log("Pressed add"),
            },
            {
              icon: "star",
              label: "Star",
              onPress: () => console.log("Pressed star"),
            },
          ]}
          onStateChange={onStateChange}
          style={{
            position: "absolute",
            bottom: 50,
            right: 50,
          }}
        />
      </Portal>
    </Provider>
  );
};

export default Menu2;
