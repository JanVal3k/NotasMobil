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
import { format, set } from 'date-fns';
import { useEstadoGlobal } from './Clases/hookCambioEstado';
import { Modal, Portal, TextInput } from 'react-native-paper';

const AllNotes = () => {
  const [notas, setNotas] = useState([]);
  const [tituloTexto, setTituloTexto] = useState('');
  const [notaTexto, setNotaTexto] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [notaSeleccionada, setNotaSeleccionada] = useState(null);
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
  const mostrarModal = (nota) => {
    setNotaSeleccionada(nota);
    setTituloTexto(nota.Titulo);
    setNotaTexto(nota.Contenido);
    setModalVisible(true);
  };
  const ocultarModal = () => {
    setModalVisible(false);
  };
  //------------------------------------------
  const borrarNota = (keyNota) => {
    console.log('esto es el index', keyNota);
    if (GuardarYMostrarNotas.deleteNote(keyNota)) {
      setEstadoGlobal(true);
    }
  };
  //------------------------------------------
  const editarNota = (btnEditarNota, key, contentTitulo, contentNota) => {
    if (!contentTitulo.trim()) {
      Alert.alert('El titulo no puede estar vacio');
    } else if (!contentNota.trim()) {
      Alert.alert('El contenido de la nota no puede estar vacio');
    } else {
      console.log('esto es el key', key);
      const btnGuardar = btnEditarNota;
      btnGuardar.editNota(key, {
        Titulo: contentTitulo,
        Contenido: contentNota,
        Fecha: new Date(),
      });
      setEstadoGlobal(true);
      return btnGuardar;
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
                      onPress={() => mostrarModal(nota)}
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
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={ocultarModal}
          contentContainerStyle={styles.contentModal}
        >
          {notaSeleccionada && (
            <View style={styles.viewModal}>
              <TextInput
                editable
                maxLength={44}
                value={tituloTexto}
                onChangeText={setTituloTexto}
                style={styles.txtTituloModal}
              ></TextInput>
              <TextInput
                editable
                maxLength={1000}
                multiline={true}
                value={notaTexto}
                onChangeText={setNotaTexto}
                style={styles.txtNotaModal}
              ></TextInput>
              <Pressable
                style={styles.btnModal}
                onPress={() => {
                  editarNota(
                    GuardarYMostrarNotas,
                    notaSeleccionada.key,
                    tituloTexto,
                    notaTexto
                  );
                  ocultarModal();
                }}
              >
                <Text style={styles.txtBtnModal}>Guardar</Text>
              </Pressable>
            </View>
          )}
        </Modal>
      </Portal>
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
  contentModal: {
    width: '90%',
    height: '90%',
    margin: 20,
    borderRadius: 16,
    backgroundColor: 'white',
    padding: 10,
  },
  viewModal: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  txtTituloModal: {
    width: '94%',
    height: 50,
    margin: 5,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  txtNotaModal: {
    width: '94%',
    minHeight: '80%',
    maxHeight: '80%',
    margin: 5,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnModal: {
    left: '71.5%',
    width: 80,
    backgroundColor: '#ff7676',
    borderRadius: 20,
    margin: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtnModal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AllNotes;
