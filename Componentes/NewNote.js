import {
  StyleSheet,
  Pressable,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { TextInput, Portal, Modal } from 'react-native-paper';
import GuardarYMostrarNotas from './Clases/GuardarYMostrarNotas';
import { useEstadoGlobal } from './Clases/hookCambioEstado';

const NewNote = () => {
  const [tituloTexto, setTituloTexto] = useState('');
  const [notaTexto, setNotaTexto] = useState('');
  const [fondo, setFondo] = useState('#000');
  const [modalVisible, setModalVisible] = useState(false);
  const { setEstadoGlobal } = useEstadoGlobal();
  const [fecha, setFecha] = useState();
  //--------------------------------------------
  const GuardarNota = (clickGuardar, titulo, Nota) => {
    if (!titulo.trim()) {
      Alert.alert('El titulo no puede estar vacio');
    } else if (!Nota.trim()) {
      Alert.alert('El contenido de la nota no puede estar vacio');
    } else {
      const btnGuardar = clickGuardar;
      btnGuardar.storeData({
        Titulo: titulo,
        Contenido: Nota,
        Fecha: new Date(),
      });
      setEstadoGlobal(true);
      return btnGuardar;
    }
  };
  //--------------------------------------------
  const actualizarEstado = () => {
    setEstadoGlobal(true);
  };
  const limpiartTxts = () => {
    setNotaTexto('');
    setTituloTexto('');
  };
  //--------------------------------------------
  const mostrarModal = () => {
    setModalVisible(true);
  };
  const ocultarModal = () => {
    setModalVisible(false);
  };

  const guardarFecha = () => {
    const objetoFecha = new Date();
    setFecha(objetoFecha);
  };
  //--------------------------------------------
  return (
    <View style={styles.viewContent}>
      <KeyboardAvoidingView
        style={styles.keyboarContent}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
      >
        <View style={styles.viewTxts}>
          <TextInput
            editable
            placeholder="Titulo:"
            placeholderTextColor="black"
            maxLength={44}
            onChangeText={setTituloTexto}
            value={tituloTexto}
            style={styles.txtTitle}
          />
          <TextInput
            editable
            multiline={true}
            placeholder="Nota:"
            placeholderTextColor="black"
            maxLength={1000}
            onChangeText={setNotaTexto}
            value={notaTexto}
            style={styles.txtNota}
          />
          <View style={styles.viewBtns}>
            <Pressable onPress={() => mostrarModal()} style={styles.btnContent}>
              <Text style={styles.txtBoton}>✏️</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                GuardarNota(GuardarYMostrarNotas, tituloTexto, notaTexto);
                limpiartTxts();
                actualizarEstado();
              }}
              style={styles.btnContent}
            >
              <Text style={styles.txtBoton}>💾</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={ocultarModal}
          contentContainerStyle={styles.contentModal}
        >
          <View style={styles.viewModal}>
            <View style={styles.ViewTopModal}>
              <Pressable
                style={styles.btnModal}
                onPress={() => {
                  console.log('De momento dejo esto aqui');
                }}
              >
                <Text style={styles.txtBtnModal}>
                  <Image
                    style={styles.imgBtnModa}
                    source={require('../assets/EsquinasRedondas.png')}
                  />
                </Text>
              </Pressable>
              <Pressable
                style={styles.btnModal}
                onPress={() => {
                  console.log('De momento dejo esto aqui');
                }}
              >
                <Text style={styles.txtBtnModal}>
                  <Image
                    style={styles.imgBtnModa}
                    source={require('../assets/EsquinasRectas.png')}
                  />
                </Text>
              </Pressable>
              <Pressable
                style={styles.btnModal}
                onPress={() => {
                  console.log('De momento dejo esto aqui');
                }}
              >
                <Text style={styles.txtBtnModal}>
                  <Image
                    style={styles.imgBtnModa}
                    source={require('../assets/LineaDelgada.png')}
                  />
                </Text>
              </Pressable>
              <Pressable
                style={styles.btnModal}
                onPress={() => {
                  console.log('De momento dejo esto aqui');
                }}
              >
                <Text style={styles.txtBtnModal}>
                  <Image
                    style={styles.imgBtnModa}
                    source={require('../assets/LineaGruesa.png')}
                  />
                </Text>
              </Pressable>
            </View>
            <View style={styles.ViewButtomModal}>
              <Pressable
                style={[styles.btnModal, { backgroundColor: '#7A8D9B' }]}
                onPress={() => {
                  console.log('De momento dejo esto aqui');
                }}
              >
                <Text></Text>
              </Pressable>
              <Pressable
                style={[styles.btnModal, { backgroundColor: '#B2B9BF' }]}
                onPress={() => {
                  console.log('De momento dejo esto aqui');
                }}
              >
                <Text></Text>
              </Pressable>
              <Pressable
                style={[styles.btnModal, { backgroundColor: '#EED0C6' }]}
                onPress={() => {
                  console.log('De momento dejo esto aqui');
                }}
              >
                <Text></Text>
              </Pressable>
              <Pressable
                style={[styles.btnModal, { backgroundColor: '#DABEB6' }]}
                onPress={() => {
                  console.log('De momento dejo esto aqui');
                }}
              >
                <Text></Text>
              </Pressable>
            </View>
          </View>
          <Pressable
            style={styles.btnModalGuaradar}
            onPress={() => {
              console.log('De momento dejo esto aqui');
            }}
          >
            <Text style={styles.txtBtnModalGuardad}>guardar</Text>
          </Pressable>
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
    margin: 2,
  },
  keyboarContent: {
    flex: 1,
  },
  viewTxts: {
    flex: 1,
    marginTop: 30,
    width: 370,
    height: 600,
  },
  txtTitle: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    color: 'white',
    maxHeight: 60,
    marginBottom: 8,
  },
  txtNota: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    color: 'white',
    maxHeight: 580,
    overflow: 'hidden',
  },
  viewBtns: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnContent: {
    marginLeft: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBoton: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentModal: {
    width: '90%',
    height: '35%',
    margin: 20,
    borderRadius: 16,
    backgroundColor: 'white',
    padding: 10,
  },
  viewModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnModal: {
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
  imgBtnModa: {
    flex: 1,
  },
  ViewTopModal: {
    flexDirection: 'row',
  },
  ViewButtomModal: {
    flexDirection: 'row',
  },
  btnModalGuaradar: {
    top: 240,
    left: 220,
    zIndex: 1,
    position: 'absolute',
    width: 90,
    height: 35,
    backgroundColor: 'blue',
    borderRadius: 10,
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
});

export default NewNote;
