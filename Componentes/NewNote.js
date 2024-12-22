import {
  StyleSheet,
  Pressable,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import GuardarYMostrarNotas from './Clases/GuardarYMostrarNotas';
import { useEstadoGlobal } from './Clases/hookCambioEstado';

const NewNote = () => {
  const [tituloTexto, setTituloTexto] = useState('');
  const [notaTexto, setNotaTexto] = useState('');
  const [color, setColor] = useState('#7B8796');
  const [pickerActivo, setPickerActivo] = useState(false);
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
            <Pressable onPress={() => guardarFecha()} style={styles.btnContent}>
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
});

export default NewNote;
