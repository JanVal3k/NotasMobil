import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import GuardarYMostrarNotas from './Clases/GuardarYMostrarNotas';
import Collapsible from 'react-native-collapsible';

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
      <ScrollView>
        <Text style={{ color: 'white' }}>NOTAS</Text>
        {notas.map((nota, index) => (
          <View key={index}>
            <View style={{ justifyContent: 'center', padding: 2 }}>
              <TouchableOpacity onPress={() => toggleCollapsible(index)}>
                <Text style={{ color: 'white' }}>
                  {isCollapsed === index
                    ? `${nota.Titulo} ⌄`
                    : `${nota.Titulo} ⌃`}
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{ overflow: 'hidden' }}>
              <Collapsible collapsed={isCollapsed !== index}>
                <View style={{ justifyContent: 'center', margin: 2 }}>
                  <Text style={{ color: 'white' }}>{nota.Contenido}</Text>
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
    margin: 2,
  },
});

export default AllNotes;
