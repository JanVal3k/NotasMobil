import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GuardarYMostrarNotas from './Clases/GuardarYMostrarNotas';
import AsyncStorage from '@react-native-async-storage/async-storage';
//------------------------------------------
const TodaLasNotas = () => {
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    GuardarYMostrarNotas.getAllNotes().then((notasTraidas) => {
      setNotas(notasTraidas);
    });
  }, []);

  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View style={styles.areaNotas}>
        <ScrollView style={styles.scrollStyle}>
          <View style={styles.tituloSeccion}>
            <Text style={{ color: 'white', fontSize: 24 }}>NOTAS</Text>
          </View>
          {notas.map((nota, index) => (
            <View key={index} style={styles.notaVisible}>
              <View style={styles.tituloStyle}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                    padding: 5,
                    fontSize: 16,
                  }}
                >
                  {nota.Titulo}
                </Text>
              </View>
              <ScrollView style={styles.scrollStyle}>
                <View style={styles.notaStyle}>
                  <Text style={{ color: 'white', padding: 5, fontSize: 23 }}>
                    {nota.Contenido}
                  </Text>
                </View>
              </ScrollView>
              <Text style={{ color: 'white' }}>
                {'  '}
                -------------------------------------------------------------------------------
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  areaNotas: {
    backgroundColor: '#4165D5',
    width: 370,
    height: 400,
    borderRadius: 14,
    paddingTop: 6,
    paddingBottom: 8,
    alignItems: 'center',
  },
  scrollStyle: {
    overflow: 'hidden',
  },
  notaVisible: {
    width: 350,
    height: 235,
    borderRadius: 14,
    padding: 6,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  tituloStyle: {
    width: 335,
    height: 50,
    backgroundColor: '#F1AC20',
    borderRadius: 10,
    marginBottom: 2,
  },

  tituloSeccion: {
    width: 330,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notaStyle: {
    width: 335,
    height: 135,
    backgroundColor: '#F1AC20',
    borderRadius: 10,
    padding: 4,
  },
});
export default TodaLasNotas;
