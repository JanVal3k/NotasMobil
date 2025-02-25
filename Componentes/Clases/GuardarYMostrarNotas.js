import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Alert } from 'react-native';
import NotificacionesService from './crearNotificaciones';

const storeData = async (value) => {
  try {
    const key = uuid.v1();
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`NotaNumero${key}`, jsonValue);
  } catch (e) {
    throw new Error('No se pudo recuperar el dato');
  }
};
//-------------------------------------
const editNota = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    const finalKey = key.startsWith('NotaNumero') ? key : `NotaNumero${key}`;
    await AsyncStorage.setItem(finalKey, jsonValue);
    return true;
  } catch (error) {
    console.error('Error al editar la nota:', error);
    throw new Error('No se pudo editar la nota');
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
//-------------------------------------
//-------------------------------------
const storeDatepicker = async (value) => {
  try {
    const key = uuid.v1();
    const tareaToStore = {
      ...value,
      Fecha:
        value.Fecha instanceof Date ? value.Fecha.toISOString() : value.Fecha,
    };
    const jsonValue = JSON.stringify(tareaToStore);
    await AsyncStorage.setItem(`Date${key}`, jsonValue);
  } catch (e) {
    console.error('Error guardando tarea:', e);
    throw new Error('No se pudo guardar el dato');
  }
};
//-------------------------------------
const getTarea = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`Date${key}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    throw new Error('No se pudo recuperar la tarea');
  }
};
//-------------------------------------
const getAllTareas = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const tareaKeys = keys.filter((key) => key.startsWith('Date'));
    const tareas = await Promise.all(
      tareaKeys.map(async (key) => {
        const tarea = await getTarea(key.replace('Date', ''));
        if (tarea) {
          return {
            ...tarea,
            Fecha: new Date(tarea.Fecha),
            Key: key,
          };
        }
        return null;
      })
    );
    return tareas
      .filter((tarea) => tarea !== null)
      .sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha));
  } catch (e) {
    console.error('Error recuperando todas las tareas', e);
    return [];
  }
};
//-------------------------------------
const deleteTarea = async (key) => {
  try {
    const fullKey = key.startsWith('Date') ? key : `Date${key}`;
    await AsyncStorage.removeItem(fullKey);
    return true;
  } catch (error) {
    console.error('Error al borrar:', error);
    Alert.alert('Error al borrar la tarea', error.message);
    return false;
  }
};
//-------------------------------------
const borrarTodoStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const tareaKeys = keys.filter((key) => key.startsWith('Date'));
    await AsyncStorage.multiRemove(tareaKeys);

    Alert.alert('Éxito', 'Todas las tareas han sido borradas');
  } catch (error) {
    Alert.alert('Error', 'No se pudieron borrar las tareas');
    console.error('Error al borrar tareas:', error);
  }
};
//-------------------------------------
export default {
  storeData,
  getData,
  getAllNotes,
  deleteAllNotes,
  deleteNote,
  storeDatepicker,
  getAllTareas,
  getTarea,
  editNota,
  deleteTarea,
  borrarTodoStorage,
};
