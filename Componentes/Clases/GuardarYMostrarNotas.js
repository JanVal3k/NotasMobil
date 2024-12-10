import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Alert } from 'react-native';

const key = uuid.v1();
const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);

    await AsyncStorage.setItem(`NotaNumero${key}`, jsonValue);
    console.log('esta es la key', key);
    Alert.alert('Nora Guardad con exito.');
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
        return nota;
      })
    );

    return notas.filter((nota) => nota !== null);
  } catch (e) {
    console.error('Error recuperando todas las notas', e);
    return [];
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

export default { storeData, getData, getAllNotes, deleteAllNotes };
