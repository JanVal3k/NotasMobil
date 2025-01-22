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
  Image,
} from 'react-native';

import React, { useState, useEffect, useRef } from 'react';
import GuardarYMostrarNotas from './Clases/GuardarYMostrarNotas';
import Collapsible from 'react-native-collapsible';
import { format, set } from 'date-fns';
import { useEstadoGlobal } from './Clases/hookCambioEstado';
import { Modal, Portal, TextInput } from 'react-native-paper';

const AllNotes = () => {
  const [notas, setNotas] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalStyleVisible, setModalStyleVisible] = useState(false);
  const [notaSeleccionada, setNotaSeleccionada] = useState(null);
  const { estadoGlobal, setEstadoGlobal } = useEstadoGlobal();
  //------------------------------------------
  const tituloRef = useRef('');
  const notaRef = useRef('');
  const [stylosNotaRef, setStylosNotaRef] = useState({});
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
    setStylosNotaRef(nota.Estilos);
    setModalVisible(true);
  };
  const formatearStyles = () => {
    setStylosNotaRef({
      Bgcolor: '#fff',
      fontColor: '#000',
      EsquinaBorder: 0,
      WeightFont: 'normal ',
      SizeFont: 16,
    });
  };
  const ocultarModal = () => {
    setModalVisible(false);
  };
  const mostrarModalStyle = () => {
    setModalStyleVisible(true);
  };
  const ocultarModalStyle = () => {
    setModalStyleVisible(false);
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
        Estilos: stylosNotaRef,
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
              style={[
                styles.touchableContent,
                {
                  backgroundColor: nota.Estilos.Bgcolor,
                  borderRadius: nota.Estilos.EsquinaBorder,
                },
              ]}
            >
              <Text
                style={{
                  color: nota.Estilos.fontColor,
                  fontWeight: nota.Estilos.WeightFont,
                  fontSize: nota.Estilos.SizeFont,
                }}
              >
                {isCollapsed === index
                  ? `${nota.Titulo} ⌃`
                  : `${nota.Titulo} ⌄`}
              </Text>
            </TouchableOpacity>

            <ScrollView style={{ overflow: 'hidden' }}>
              <Collapsible
                collapsed={isCollapsed !== index}
                style={[
                  styles.collapsibleContent,
                  {
                    backgroundColor: nota.Estilos.Bgcolor,
                    borderRadius: nota.Estilos.EsquinaBorder,
                  },
                ]}
              >
                <View style={{ justifyContent: 'center', margin: 2 }}>
                  <Text
                    style={{
                      color: nota.Estilos.fontColor,
                      fontWeight: nota.Estilos.WeightFont,
                      fontSize: nota.Estilos.SizeFont,
                    }}
                  >
                    {nota.Contenido}
                  </Text>
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
                  style={[
                    styles.txtTituloModal,
                    {
                      backgroundColor: stylosNotaRef.Bgcolor,
                      borderRadius: stylosNotaRef.EsquinaBorder,
                      fontWeight: stylosNotaRef.WeightFont,
                      fontSize: stylosNotaRef.SizeFont,
                      color: stylosNotaRef.fontColor,
                    },
                  ]}
                ></TextInput>
                <TextInput
                  editable
                  maxLength={1000}
                  multiline={true}
                  defaultValue={notaRef.current}
                  onChangeText={(texto) => {
                    notaRef.current = texto;
                  }}
                  style={[
                    styles.txtNotaModal,
                    {
                      backgroundColor: stylosNotaRef.Bgcolor,
                      borderRadius: stylosNotaRef.EsquinaBorder,
                      fontWeight: stylosNotaRef.WeightFont,
                      fontSize: stylosNotaRef.SizeFont,
                      color: stylosNotaRef.fontColor,
                    },
                  ]}
                ></TextInput>
                <View style={styles.viewBtnModal1}>
                  <Pressable
                    onPress={() => mostrarModalStyle()}
                    style={styles.btnStyleContent}
                  >
                    <Text style={styles.txtBotonStyles}>✏️</Text>
                  </Pressable>
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
              </View>
            </KeyboardAvoidingView>
          )}
        </Modal>
        {/*------------------------------------------ */}
        <Modal
          visible={modalStyleVisible}
          onDismiss={ocultarModalStyle}
          contentContainerStyle={styles.contentModalStyle}
        >
          <View style={styles.viewModalStyle}>
            <View style={styles.ViewTopModalStyle}>
              <Pressable
                style={styles.btnModalStyle}
                onPress={() => {
                  setStylosNotaRef((prevEstilo) => ({
                    ...prevEstilo,
                    EsquinaBorder: prevEstilo.EsquinaBorder === 0 ? 14 : 0,
                  }));
                }}
              >
                <Text>
                  <Image
                    style={styles.imgBtnModa}
                    source={require('../assets/EsquinasRedondas.png')}
                  />
                </Text>
              </Pressable>
              <Pressable
                style={styles.btnModalStyle}
                onPress={() => {
                  setStylosNotaRef((prevEstilo) => ({
                    ...prevEstilo,
                    WeightFont:
                      prevEstilo.WeightFont === 'normal' ? 'bold' : 'normal',
                  }));
                }}
              >
                <Text style={{ fontWeight: 'bold', fontSize: 30 }}>A</Text>
              </Pressable>
              <Pressable
                style={styles.btnModalStyle}
                onPress={() => {
                  setStylosNotaRef((prevEstilo) => ({
                    ...prevEstilo,
                    SizeFont:
                      prevEstilo.SizeFont <= 24 ? prevEstilo.SizeFont + 1 : 24,
                  }));
                }}
              >
                <Text style={{ fontSize: 30 }}>A+</Text>
              </Pressable>
              <Pressable
                style={styles.btnModalStyle}
                onPress={() => {
                  setStylosNotaRef((prevEstilo) => ({
                    ...prevEstilo,
                    SizeFont:
                      prevEstilo.SizeFont >= 16 ? prevEstilo.SizeFont - 1 : 16,
                  }));
                }}
              >
                <Text style={{ fontSize: 30 }}>A-</Text>
              </Pressable>
            </View>
            <View style={styles.ViewButtomModal}>
              <Pressable
                style={[styles.btnModalStyle, { backgroundColor: '#7A8D9B' }]}
                onPress={() => {
                  setStylosNotaRef((prevEstilo) => ({
                    ...prevEstilo,
                    Bgcolor:
                      prevEstilo.Bgcolor === '#7A8D9B' ? '#fff' : '#7A8D9B',
                  }));
                }}
              >
                <Text></Text>
              </Pressable>
              <Pressable
                style={[styles.btnModalStyle, { backgroundColor: '#fcb7af' }]}
                onPress={() => {
                  setStylosNotaRef((prevEstilo) => ({
                    ...prevEstilo,
                    Bgcolor:
                      prevEstilo.Bgcolor === '#fcb7af' ? '#fff' : '#fcb7af',
                  }));
                }}
              >
                <Text></Text>
              </Pressable>
              <Pressable
                style={[styles.btnModalStyle, { backgroundColor: '#b0f2c2' }]}
                onPress={() => {
                  setStylosNotaRef((prevEstilo) => ({
                    ...prevEstilo,
                    Bgcolor:
                      prevEstilo.Bgcolor === '#b0f2c2' ? '#fff' : '#b0f2c2',
                  }));
                }}
              >
                <Text></Text>
              </Pressable>
              <Pressable
                style={[styles.btnModalStyle, { backgroundColor: '#ffda9e' }]}
                onPress={() => {
                  setStylosNotaRef((prevEstilo) => ({
                    ...prevEstilo,
                    Bgcolor:
                      prevEstilo.Bgcolor === '#ffda9e' ? '#fff' : '#ffda9e',
                  }));
                }}
              >
                <Text></Text>
              </Pressable>
              <Pressable
                style={styles.btnModalGuaradar}
                onPress={() => {
                  formatearStyles();
                }}
              >
                <Text style={styles.txtBtnModalGuardad}>Rest...</Text>
              </Pressable>
            </View>
          </View>
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
  },
  collapsibleContent: {
    borderTopWidth: 1,
    borderTopColor: '#192b42',
    padding: 7,
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
    overflow: 'hidden',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  txtTituloModal: {
    width: '95%',
    height: 50,
    margin: 5,
    padding: 5,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  viewBtnModal1: {
    flexDirection: 'row',
  },
  btnModal: {
    left: '45%',
    width: 80,
    backgroundColor: '#ff7676',
    borderRadius: 20,
    marginTop: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtnModal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  btnStyleContent: {
    left: '40.5%',
    width: 80,
    backgroundColor: '#ff7676',
    borderRadius: 20,
    marginTop: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBotonStyles: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  contentModalStyle: {
    zIndex: 10,
    width: '90%',
    height: '35%',
    marginTop: 325,
    margin: 20,
    borderRadius: 16,
    backgroundColor: 'white',
    padding: 10,
  },
  viewModalStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewTopModalStyle: {
    flexDirection: 'row',
  },
  btnModalStyle: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  txtBtnModalGuardad: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  ViewButtomModal: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default AllNotes;
