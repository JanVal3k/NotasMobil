import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import GuardarYMostrarNotas from './Clases/GuardarYMostrarNotas';
import Collapsible from 'react-native-collapsible';
import { format } from 'date-fns';
import { useEstadoGlobal } from './Clases/hookCambioEstado';

const AllNotes = () => {
  const [notas, setNotas] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(null);
  const { estadoGlobal, setEstadoGlobal } = useEstadoGlobal();
  //------------------------------------------
  useEffect(() => {
    GuardarYMostrarNotas.getAllNotes().then((notasTraidas) => {
      setNotas(notasTraidas);
    });
  }, []);
  //------------------------------------------
  useEffect(() => {
    if (estadoGlobal) {
      GuardarYMostrarNotas.getAllNotes().then((notasTraidas) => {
        setNotas(notasTraidas);
        setEstadoGlobal(false);
      });
    }
  }, [estadoGlobal]);
  //------------------------------------------
  const borrarNota = (keyNota) => {
    console.log('esto es el index', keyNota);
    if (GuardarYMostrarNotas.deleteNote(keyNota)) {
      setEstadoGlobal(true);
    }
  };
  //------------------------------------------
  const alertaSiyNo = (key) => {
    Alert.alert(
      'Esta acción no se puede deshacer.',
      '¿Estás seguro que quiere borrar la nota?',
      [
        {
          text: 'NO',
          onPress: () => console.log('Presionaste NO'),
          style: 'cancel',
        },
        {
          text: 'SI',
          onPress: () => borrarNota(key),
        },
      ],
      { cancelable: false }
    );
  };
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
                  <Text style={{ color: 'black' }}>{nota.Contenido}</Text>
                </View>
                <View style={styles.viewFcBtns}>
                  <View style={styles.viewFecha}>
                    <Text style={styles.txtFecha}>
                      {nota.Fecha
                        ? format(new Date(nota.Fecha), 'hh:mm a dd/MM/yyyy')
                        : 'Sin fecha'}
                    </Text>
                  </View>
                  <View style={styles.viewPressables}>
                    <Pressable
                      style={styles.btnPressable}
                      onPress={() => console.log('Botón editas')}
                    >
                      <Text style={styles.txtBotones}>✏️</Text>
                    </Pressable>
                    <Pressable
                      style={styles.btnPressable}
                      onPress={() => console.log('Botón configuracion')}
                    >
                      <Text style={styles.txtBotones}>⚙️</Text>
                    </Pressable>
                    <Pressable
                      style={styles.btnPressable}
                      onPress={() => alertaSiyNo(nota.key)}
                    >
                      <Text style={styles.txtBotones}>🗑️</Text>
                    </Pressable>
                  </View>
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
    backgroundColor: 'white',
  },
  txtTouchable: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  collapsibleContent: {
    borderTopWidth: 1,
    borderTopColor: '#192b42',
    padding: 7,
    backgroundColor: 'white',
  },
  viewFcBtns: {
    width: '100%',
    flexDirection: 'row',
  },
  viewPressables: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '50%',
    marginLeft: 1,
  },
  btnPressable: {
    marginHorizontal: 10,
  },
  viewFecha: {
    justifyContent: 'flex-start',
    marginRight: 1,
    padding: 3,
    width: '50%',
    height: 'auto',
  },
  txtFecha: {
    fontSize: 12,
    color: 'black',
  },
  txtBotones: {
    margin: 1,
  },
});

export default AllNotes;
