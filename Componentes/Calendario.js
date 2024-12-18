import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  StatusBar,
  ScrollView,
} from 'react-native';
import { DatePickerModal, registerTranslation } from 'react-native-paper-dates';
import GuardarYMostrarNotas from './Clases/GuardarYMostrarNotas';
import { useEstadoGlobal } from './Clases/hookCambioEstado';
import { da, es } from 'date-fns/locale';
registerTranslation('es', es);
const Calendario = () => {
  const { estadoGlobal, setEstadoGlobal } = useEstadoGlobal();
  const [tareas, setTareas] = useState([]);
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
      <ScrollView>
        <Pressable style={styles.presseable} onPress={() => abrirCalendario()}>
          <Text style={styles.txtPresseable}>📅</Text>
        </Pressable>
      </ScrollView>
      <DatePickerModal
        animationType="slide"
        locale="es"
        mode="single"
        visible={calenVisible}
        onDismiss={() => onConfirm()}
        onConfirm={() => onConfirm()}
        date={fecha}
      />
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
});
export default Calendario;
