import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import GuardarYMostrarNotas from './Clases/GuardarYMostrarNotas';

const AllNotes = () => {
  const [notas, setNotas] = useState([]);
  //------------------------------------------
  useEffect(() => {
    GuardarYMostrarNotas.getAllNotes().then((notasTraidas) => {
      setNotas(notasTraidas);
      console.log('esto tiene notasTraidas', notasTraidas);
    });
  }, []);
  return (
    <View style={styles.viewContent}>
      <ScrollView>
        <Text style={{ color: 'white' }}>NOTAS</Text>
        {notas.map((notas, index) => {
          <View key={index}>
            <View style={{ justifyContent: 'center', padding: 2 }}>
              <Text style={{ color: 'white' }}>{notas.Titulo}</Text>
            </View>
            <ScrollView style={{ margin: 2 }}>
              <View style={{ justifyContent: 'center', padding: 2 }}>
                <Text style={{ color: 'white' }}>{notas.Contenido}</Text>
              </View>
            </ScrollView>
          </View>;
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  viewContent: {
    flex: 1,
    backgroundColor: '#192b42',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
});

export default AllNotes;
