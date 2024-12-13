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
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
      >
        <View style={{ flex: 1 }}>
          <TextInput
            editable
            placeholder="Titulo"
            placeholderTextColor="white"
            style={{ width: 300, margin: 2 }}
            onChangeText={setTituloTexto}
          />
          <TextInput
            editable
            multiline={true}
            placeholder="Nota:"
            placeholderTextColor="white"
            onChangeText={setNotaTexto}
            value={notaTexto}
            color="#FFF"
            style={{ width: 300, height: 500, margin: 2 }}
          />
          <Pressable
            onPress={() =>
              GuardarNota(GuardarYMostrarNotas, tituloTexto, notaTexto)
            }
          >
            <Text style={{ fontSize: 18 }}>💾</Text>
          </Pressable>
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
});

export default NewNote;
