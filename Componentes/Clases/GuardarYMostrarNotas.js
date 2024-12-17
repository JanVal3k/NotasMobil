import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Alert } from 'react-native';

const storeData = async (value) => {
  try {
    const key = uuid.v1();
    const jsonValue = JSON.stringify(value);

    await AsyncStorage.setItem(`NotaNumero${key}`, jsonValue);
    console.log('esta es la key', key);
  } catch (e) {
    throw new Error('No se pudo recuperar el dato');
  }
};
//-------------------------------------
const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`NotaNumero${key}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    throw new Error('No se pudo recuperar el dato');
  }
};
//-------------------------------------
const getAllNotes = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const notaKeys = keys.filter((key) => key.startsWith('NotaNumero'));
    const notas = await Promise.all(
      notaKeys.map(async (key) => {
        const nota = await getData(key.replace('NotaNumero', ''));
        return { ...nota, key };
      })
    );

    return notas
      .filter((nota) => nota !== null)
      .sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha));
  } catch (e) {
    console.error('Error recuperando todas las notas', e);
    return [];
  }
};
//-------------------------------------
const deleteNote = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('nota borrada con la key', key);
  } catch (error) {
    Alert.alert('error al borrar la nota', error);
  }
};

const deleteAllNotes = async () => {
  try {
    await AsyncStorage.clear();
    Alert.alert('Datos borrados');
  } catch (error) {
    console.error('error al borrar', error);
  }
};

export default { storeData, getData, getAllNotes, deleteAllNotes, deleteNote };
