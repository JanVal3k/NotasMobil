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

const NewNote = () => {
  const [tituloTexto, setTituloTexto] = useState('');
  const [notaTexto, setNotaTexto] = useState('');
  const [color, setColor] = useState('#7B8796');
  const [pickerActivo, setPickerActivo] = useState(false);
  //--------------------------------------------
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
    return btnGuardar;
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
            placeholderTextColor="white"
            style={styles.txtTitle}
            onChangeText={setTituloTexto}
          />
          <TextInput
            editable
            multiline={true}
            placeholder="Nota:"
            placeholderTextColor="white"
            onChangeText={setNotaTexto}
            value={notaTexto}
            style={styles.txtNota}
          />
          <View style={styles.viewBtns}>
            <Pressable
              onPress={() => setPickerActivo(true)}
              style={styles.btnContent}
            >
              <Text style={styles.txtBoton}>✏️</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                GuardarNota(GuardarYMostrarNotas, tituloTexto, notaTexto)
              }
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
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#7B8796',
    color: 'white',
    maxHeight: 60,
    marginBottom: 8,
  },
  txtNota: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#7B8796',
    color: 'white',
    maxHeight: 530,
    overflow: 'hidden',
  },
  viewBtns: {
    flex: 1,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnContent: {
    backgroundColor: '#5C6570',
    borderRadius: 12,
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
