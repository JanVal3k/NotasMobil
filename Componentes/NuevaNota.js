import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  SafeAreaView,
  Modal,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import Guardar from './Clases/GuardarYMostrarNotas';
import { useEstadoGlobal } from './Clases/hookCambioEstado';

const NotaNueva = ({ onClick }) => {
  const [modalVisual, setModalVisual] = useState(true);
  const [tituloTexto, setTituloTexto] = useState('');
  const [notaTexto, setNotaTexto] = useState('');
  const [alerta, setAlerta] = useState(false);
  const { setEstadoGlobal } = useEstadoGlobal();
  //--------------------------------------------
  const onToggleSnackBar = () => setAlerta(!alerta);
  const onDismissSnackBar = () => setAlerta(false);
  const GuardarNota = (clickGuardar, titulo, Nota) => {
    if (!titulo.trim()) {
      Alert.alert('El titulo no puede estar vacio');
    } else if (!Nota.trim()) {
      Alert.alert('El contenido de la nota no puede estar vacio');
    }
    const btnGuardar = clickGuardar;
    btnGuardar.storeData({
      Titulo: titulo,
      Contenido: Nota,
    });
    onToggleSnackBar();
    return btnGuardar;
  };
  //---------------------------------------------
  const hideModal = () => {
    setModalVisual(false);
    setEstadoGlobal(true);
    onClick(null);
  };
  //---------------------------------------------

  return (
    <Modal
      visible={modalVisual}
      onRequestClose={hideModal}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <StatusBar style="light" />
          <TextInput
            editable
            multiline
            numberOfLines={1}
            placeholder="Titulo:"
            placeholderTextColor="#6B6B6B"
            onChangeText={setTituloTexto}
            value={tituloTexto}
            color="#FFF"
            style={styles.txtTitulo}
          />
          <TextInput
            editable
            multiline={true}
            placeholder="Nota:"
            placeholderTextColor="#6B6B6B"
            onChangeText={setNotaTexto}
            value={notaTexto}
            color="#FFF"
            style={styles.txtNota}
          />
          <Pressable style={styles.styleConfiguracion} onPress={''}>
            <Text style={{ fontSize: 18 }}>⚙️</Text>
          </Pressable>
          <Pressable style={styles.styleClose} onPress={''}>
            <Text style={{ fontSize: 18, color: 'black' }}>X</Text>
          </Pressable>
          <Pressable
            style={styles.styleGuardar}
            onPress={() => GuardarNota(Guardar, tituloTexto, notaTexto)}
          >
            <Text style={{ fontSize: 18 }}>💾</Text>
          </Pressable>
        </View>
      </View>
      <Snackbar
        visible={alerta}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'X',
          onPress: () => {
            hideModal();
          },
        }}
      >
        Nota Guardada
      </Snackbar>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    height: 690,
    maxHeight: Dimensions.get('window').height * 0.8,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  txtTitulo: {
    fontSize: 18,
    backgroundColor: '#6A9FA6',
    borderRadius: 10,
    marginBottom: 10,
  },
  txtNota: {
    fontSize: 16,
    height: '83%',
    backgroundColor: '#6A9FA6',
    borderRadius: 10,
    textAlignVertical: 'top',
  },
  styleClose: {
    position: 'absolute',
    backgroundColor: '#F1AC20',
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleConfiguracion: {
    position: 'absolute',
    backgroundColor: '#F1AC20',
    bottom: 20,
    right: 63,
    width: 40,
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleGuardar: {
    position: 'absolute',
    backgroundColor: '#F1AC20',
    bottom: 20,
    right: 106,
    width: 40,
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotaNueva;
