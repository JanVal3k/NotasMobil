import React, { useState } from "react";
import { View, Text } from "react-native";
import { FAB, Portal } from "react-native-paper";

const Menu = () => {
  const [open, setOpen] = useState(true);

  const onStateChange = ({ open: newOpen }) => {
    setOpen(newOpen);
  };

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? "close" : "menu"}
        backdropColor="transparent"
        actions={[
          {
            icon: "note",
            label: "Notas",
            onPress: () => console.log("Pressed star"),
          },
          {
            icon: "plus",
            label: "Nota nueva",
            onPress: () => console.log("Pressed add"),
          },
          {
            icon: "calendar",
            label: "Calendario",
            onPress: () => console.log("Pressed email"),
          },
          {
            icon: "cog",
            label: "Configuracion",
            onPress: () => console.log("Pressed notifications"),
          },
        ]}
        onStateChange={onStateChange}
      />
    </Portal>
  );
};

export default Menu;
