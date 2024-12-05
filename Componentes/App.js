import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Menu from "./Menu";

const App = () => {
  const [Visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
  }, []);

  // const handlePress = () => {
  //   setVisible(!Visible);
  // };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Menu />
      </View>
    </PaperProvider>
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
  Ctexto: {
    color: "#fff",
    fontSize: 34,
  },
});

export default App;
