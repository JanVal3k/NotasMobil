import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Menu from "./Menu";
import NotaNueva from "./NuevaNota";

const App = () => {
  //-----------------------------------------------------
  const [notaNueva, setNotaNueva] = useState(null);
  //-----------------------------------------------------
  useEffect(() => {
    setNotaNueva(null);
  }, []);

  const handlePress = (activarComponente) => {
    setNotaNueva(notaNueva === "NotaNueva" ? null : activarComponente);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Menu onClick={handlePress} />
        {notaNueva === "NotaNueva" && <NotaNueva onClick={handlePress} />}
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
