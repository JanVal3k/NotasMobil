import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
} from 'react-native';

import React, { useState, useEffect, useRef } from 'react';
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
  const tituloRef = useRef('');
  const notaRef = useRef('');
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
    tituloRef.current = nota.Titulo;
    notaRef.current = nota.Contenido;
    setModalVisible(true);
  };
  const ocultarModal = () => {
    setModalVisible(false);
  };
  //------------------------------------------
  const borrarNota = (keyNota) => {
    if (GuardarYMostrarNotas.deleteNote(keyNota)) {
      setEstadoGlobal(true);
    }
  };
  //------------------------------------------
  const editarNota = (btnEditarNota, key) => {
    if (!tituloRef.current.trim()) {
      Alert.alert('El titulo no puede estar vacio');
    } else if (!notaRef.current.trim()) {
      Alert.alert('El contenido de la nota no puede estar vacio');
    } else {
      btnEditarNota.editNota(key, {
        Titulo: tituloRef.current,
        Contenido: notaRef.current,
        Fecha: new Date(),
      });
      setEstadoGlobal(true);
      return btnEditarNota;
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
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              keyboardVerticalOffset={100}
            >
              <View style={styles.viewModal}>
                <TextInput
                  editable
                  maxLength={44}
                  defaultValue={tituloRef.current}
                  onChangeText={(texto) => {
                    tituloRef.current = texto;
                  }}
                  style={styles.txtTituloModal}
                ></TextInput>
                <TextInput
                  editable
                  maxLength={1000}
                  multiline={true}
                  defaultValue={notaRef.current}
                  onChangeText={(texto) => {
                    notaRef.current = texto;
                  }}
                  style={styles.txtNotaModal}
                ></TextInput>
                <Pressable
                  style={styles.btnModal}
                  onPress={() => {
                    editarNota(GuardarYMostrarNotas, notaSeleccionada.key);
                    ocultarModal();
                  }}
                >
                  <Text style={styles.txtBtnModal}>Guardar</Text>
                </Pressable>
              </View>
            </KeyboardAvoidingView>
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
    padding: 5,
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
    padding: 5,
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
