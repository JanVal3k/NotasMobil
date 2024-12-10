import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Menu from './Menu';
import NotaNueva from './NuevaNota';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TodaLasNotas from './TodaLasNotas';
//---------------------------------------
const App = () => {
  const [notaNueva, setNotaNueva] = useState(null);

  useEffect(() => {
    setNotaNueva(null);
  }, []);

  const handlePress = (activarComponente) => {
    setNotaNueva(notaNueva === 'NotaNueva' ? null : activarComponente);
  };

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <View style={styles.container}>
          <StatusBar style="light" />
          <Menu onClick={handlePress} />
          {notaNueva === 'NotaNueva' && (
            <View style={styles.modalContainer}>
              <NotaNueva onClick={handlePress} />
            </View>
          )}
          <TodaLasNotas />
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c3e8c9',
    justifyContent: '',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBoton: {
    top: -5,
    color: '#fff',
    fontSize: 50,
  },
  Ctexto: {
    color: '#fff',
    fontSize: 34,
  },
});

export default App;
