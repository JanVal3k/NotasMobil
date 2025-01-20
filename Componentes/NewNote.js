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
  const [estilo, setEstilo] = useState({
    Bgcolor: '#fff',
    fontColor: '#000',
    EsquinaBorder: 0,
    StyleFont: 'normal',
    WeightFont: 'normal ',
    SizeFont: 16,
  });
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
        Estilos: estilo,
      });
      formatearStyles();
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
  const formatearStyles = () => {
    setEstilo({
      Bgcolor: '#fff',
      fontColor: '#000',
      EsquinaBorder: 0,
      WeightFont: 'normal ',
      SizeFont: 16,
    });
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
            style={[
              styles.txtTitle,
              {
                backgroundColor: estilo.Bgcolor,
                borderRadius: estilo.EsquinaBorder,
                color: estilo.fontColor,
                fontSize: estilo.SizeFont,
                fontWeight: estilo.WeightFont,
              },
            ]}
          />
          <TextInput
            editable
            multiline={true}
            placeholder="Nota:"
            placeholderTextColor="black"
            maxLength={1000}
            onChangeText={setNotaTexto}
            value={notaTexto}
            style={[
              styles.txtNota,
              {
                backgroundColor: estilo.Bgcolor,
                borderRadius: estilo.EsquinaBorder,
                color: estilo.fontColor,
                fontSize: estilo.SizeFont,
                fontWeight: estilo.WeightFont,
              },
            ]}
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
                  setEstilo((prevEstilo) => ({
                    ...prevEstilo,
                    EsquinaBorder: prevEstilo.EsquinaBorder === 0 ? 14 : 0,
                  }));
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
                  setEstilo((prevEstilo) => ({
                    ...prevEstilo,
                    WeightFont:
                      prevEstilo.WeightFont === 'normal' ? 'bold' : 'normal',
                  }));
                }}
              >
                <Text
                  style={[
                    styles.txtBtnModal,
                    { fontWeight: 'bold', fontSize: 30 },
                  ]}
                >
                  A
                </Text>
              </Pressable>
              <Pressable
                style={styles.btnModal}
                onPress={() => {
                  setEstilo((prevEstilo) => ({
                    ...prevEstilo,
                    SizeFont:
                      prevEstilo.SizeFont <= 24 ? prevEstilo.SizeFont + 1 : 24,
                  }));
                }}
              >
                <Text style={[styles.txtBtnModal, { fontSize: 30 }]}>A+</Text>
              </Pressable>
              <Pressable
                style={styles.btnModal}
                onPress={() => {
                  setEstilo((prevEstilo) => ({
                    ...prevEstilo,
                    SizeFont:
                      prevEstilo.SizeFont >= 16 ? prevEstilo.SizeFont - 1 : 16,
                  }));
                }}
              >
                <Text style={[styles.txtBtnModal, { fontSize: 30 }]}>A-</Text>
              </Pressable>
            </View>
            <View style={styles.ViewButtomModal}>
              <Pressable
                style={[styles.btnModal, { backgroundColor: '#7A8D9B' }]}
                onPress={() => {
                  setEstilo((prevEstilo) => ({
                    ...prevEstilo,
                    Bgcolor:
                      prevEstilo.Bgcolor === '#7A8D9B' ? '#fff' : '#7A8D9B',
                  }));
                }}
              >
                <Text></Text>
              </Pressable>
              <Pressable
                style={[styles.btnModal, { backgroundColor: '#fcb7af' }]}
                onPress={() => {
                  setEstilo((prevEstilo) => ({
                    ...prevEstilo,
                    Bgcolor:
                      prevEstilo.Bgcolor === '#fcb7af' ? '#fff' : '#fcb7af',
                  }));
                }}
              >
                <Text></Text>
              </Pressable>
              <Pressable
                style={[styles.btnModal, { backgroundColor: '#b0f2c2' }]}
                onPress={() => {
                  setEstilo((prevEstilo) => ({
                    ...prevEstilo,
                    Bgcolor:
                      prevEstilo.Bgcolor === '#b0f2c2' ? '#fff' : '#b0f2c2',
                  }));
                }}
              >
                <Text></Text>
              </Pressable>
              <Pressable
                style={[styles.btnModal, { backgroundColor: '#ffda9e' }]}
                onPress={() => {
                  setEstilo((prevEstilo) => ({
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
    maxHeight: 60,
    marginBottom: 8,
  },
  txtNota: {
    flex: 1,
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
    marginTop: 325,
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
    top: 100,
    left: 190,
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
