import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  StatusBar,
  ScrollView,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { DatePickerModal, registerTranslation } from 'react-native-paper-dates';
import GuardarYMostrarNotas from './Clases/GuardarYMostrarNotas';
import { useEstadoGlobal } from './Clases/hookCambioEstado';
import { da, es } from 'date-fns/locale';
registerTranslation('es', es);
const Calendario = () => {
  const { estadoGlobal, setEstadoGlobal } = useEstadoGlobal();
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState(false);
  const [fecha, setFecha] = useState(new Date());
  const [calenVisible, setCalenVisible] = useState(false);

  //--------------------------------------------
  const abrirCalendario = () => {
    setCalenVisible(true);
  };
  const onConfirm = (date) => {
    setFecha(date);
    setCalenVisible(false);
  };
  //--------------------------------------------
  useEffect(() => {
    GuardarYMostrarNotas.getAllTareas().then((tareasTraidas) => {
      setTareas(tareasTraidas);
    });
  }, []);
  //------------------------------------------
  useEffect(() => {
    if (estadoGlobal) {
      GuardarYMostrarNotas.getAllTareas().then((tareasTraidas) => {
        setTareas(tareasTraidas);
        setEstadoGlobal(false);
      });
    }
  }, [estadoGlobal]);
  //------------------------------------------
  const GuardarTareas = (clickGuardar, titulo) => {
    if (!Tarea.trim()) {
      Alert.alert('El nombre de la tarea no puede estar vacio');
    } else {
      const btnGuardar = clickGuardar;
      btnGuardar.storeDatepicker({
        Titulo: titulo,
        Fecha: new Date(),
      });
      setEstadoGlobal(true);
      return btnGuardar;
    }
  };
  //------------------------------------------
  return (
    <View style={styles.viewContainer}>
      <StatusBar style="light" />
      <ScrollView></ScrollView>

      <DatePickerModal
        animationType="slide"
        locale="es"
        mode="single"
        visible={calenVisible}
        onDismiss={() => onConfirm()}
        onConfirm={() => onConfirm()}
        date={fecha}
      />
      <TouchableOpacity
        style={styles.extraButton}
        onPress={() => setNuevaTarea(true)}
      >
        <Text style={styles.extraButtonText}>+</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={nuevaTarea}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setNuevaTarea(!nuevaTarea);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => abrirCalendario()}
            >
              <Text style={styles.textStyle}>📅</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  presseable: {
    backgroundColor: '#7B8796',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  txtPresseable: {
    fontSize: 30,
  },
  extraButton: {
    borderRadius: 12,
    top: -50,
    right: -150,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#5C6570',
  },
  extraButtonText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default Calendario;
