import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import GuardarYMostrarNotas from './Clases/GuardarYMostrarNotas';
import Collapsible from 'react-native-collapsible';
import { Button } from 'react-native-paper';

const AllNotes = () => {
  const [notas, setNotas] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(null);
  //------------------------------------------
  useEffect(() => {
    GuardarYMostrarNotas.getAllNotes().then((notasTraidas) => {
      setNotas(notasTraidas);
    });
  }, []);
  //------------------------------------------
  const toggleCollapsible = (index) => {
    setIsCollapsed(isCollapsed === index ? null : index);
  };
  return (
    <View style={styles.viewContent}>
      <Text style={styles.txtContent}>NOTAS</Text>
      <ScrollView style={styles.scrollContent}>
        {notas.map((nota, index) => (
          <View key={index} style={styles.viewMap}>
            <TouchableOpacity
              onPress={() => toggleCollapsible(index)}
              style={styles.touchableContent}
            >
              <Text style={styles.txtTouchable}>
                {isCollapsed === index
                  ? `${nota.Titulo} ⌃`
                  : `${nota.Titulo} ⌄`}
              </Text>
            </TouchableOpacity>

            <ScrollView style={{ overflow: 'hidden' }}>
              <Collapsible
                collapsed={isCollapsed !== index}
                style={styles.collapsibleContent}
              >
                <View style={{ justifyContent: 'center', margin: 2 }}>
                  <Text style={{ color: 'white' }}>{nota.Contenido}</Text>
                </View>
                <View style={styles.viewPressables}>
                  <Pressable
                    style={styles.btnPressable}
                    onPress={() => console.log('Botón editas')}
                  >
                    <Text>✏️</Text>
                  </Pressable>
                  <Pressable
                    style={styles.btnPressable}
                    onPress={() => console.log('Botón configuracion')}
                  >
                    <Text>⚙️</Text>
                  </Pressable>
                  <Pressable
                    style={styles.btnPressable}
                    onPress={() => console.log('Botón papelera')}
                  >
                    <Text>🗑️</Text>
                  </Pressable>
                </View>
              </Collapsible>
            </ScrollView>
          </View>
        ))}
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
    padding: 10,
  },
  scrollContent: {
    flex: 1,
    paddingBottom: 10,
  },
  txtContent: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  viewMap: {
    paddingBottom: 10,
  },
  touchableContent: {
    padding: 5,
    backgroundColor: '#7B8796',
  },
  txtTouchable: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  collapsibleContent: {
    borderTopWidth: 1,
    borderTopColor: '#192b42',
    padding: 7,
    backgroundColor: '#7B8796',
  },
  viewPressables: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnPressable: {
    marginHorizontal: 13,
  },
});

export default AllNotes;
