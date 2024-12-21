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
  FlatList,
} from 'react-native';
import {
  DatePickerModal,
  registerTranslation,
  TimePickerModal,
} from 'react-native-paper-dates';
import { TextInput, Checkbox } from 'react-native-paper';
import GuardarYMostrarNotas from './Clases/GuardarYMostrarNotas';
import { useEstadoGlobal } from './Clases/hookCambioEstado';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
registerTranslation('es', es);
//------------------------------------------
//------------------------------------------
const Calendario = () => {
  const { estadoGlobal, setEstadoGlobal } = useEstadoGlobal();
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState(false);
  const [useFecha, setUseFecha] = useState(new Date());
  const [useTiempo, setUseTiempo] = useState({});
  const [calenVisible, setCalenVisible] = useState(false);
  const [timerVisible, setTimerVisible] = useState(false);
  const [tituloTexto, setTituloTexto] = useState('');
  const [tareaSelect, setTareaSelect] = useState({});
  const [colors, setColors] = useState({});
  //--------------------------------------------
  const abrirCalendario = () => {
    setCalenVisible(true);
  };
  const abrirTimer = () => {
    setTimerVisible(true);
  };
  const cerrarModal = () => {
    setNuevaTarea(false);
  };
  const onConfirmDate = (date) => {
    setUseFecha(date);
    setCalenVisible(false);
  };
  const onConfirmTimer = (Tiempo) => {
    setUseTiempo({ Tiempo });
    setTimerVisible(false);
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
  const GuardarTareas = (clickGuardar, titulo, fecha, tiempo) => {
    if (!titulo.trim()) {
      Alert.alert('El nombre de la tarea no puede estar vacio');
    } else {
      const btnGuardar = clickGuardar;
      btnGuardar.storeDatepicker({
        Key: Date.now().toString(),
        Titulo: titulo,
        Fecha: fecha,
        Hora: tiempo,
      });
      borrarTxtFechyHora();
      setEstadoGlobal(true);
      return btnGuardar;
    }
  };
  //------------------------------------------
  const toggleCheck = (item) => {
    setTareaSelect((prev) => ({
      ...prev,
      [item.Key]: !prev[item.Key],
    }));
    setColors((prevColors) => {
      const updatedColors = { ...prevColors };

      if (!prevColors[item.Key]) {
        updatedColors[item.Key] = { txtColor: 'white', bgColor: 'black' };
      } else {
        delete updatedColors[item.Key];
      }

      return updatedColors;
    });
  };
  //------------------------------------------
  const borrarTxtFechyHora = () => {
    setTituloTexto(''), setUseFecha(new Date());
    setUseTiempo({});
  };
  //------------------------------------------
  const renderItem = ({ item }) => {
    const colorStyles = colors[item.Key] || {
      txtColor: 'black',
      bgColor: 'white',
    };
    return (
      <View
        style={[
          styles.ContenedorFlatList,
          { backgroundColor: colorStyles.bgColor },
        ]}
      >
        <View style={styles.contenedorCheckbox}>
          <Checkbox
            status={tareaSelect[item.Key] ? 'checked' : 'unchecked'}
            onPress={() => toggleCheck(item)}
          />
        </View>
        <View style={styles.contenedorTxtFlat}>
          <Text style={[styles.txtTitleFlat, { color: colorStyles.txtColor }]}>
            Titulo: {item.Titulo}
          </Text>
          <Text style={[styles.txtTitleFlat, { color: colorStyles.txtColor }]}>
            {item.Fecha.startDate
              ? `Inicio:  ${format(item.Fecha.startDate, 'dd/MM/yyyy')}`
              : 'Sin fecha inicial'}
          </Text>
          <Text style={[styles.txtTitleFlat, { color: colorStyles.txtColor }]}>
            {item.Fecha.endDate
              ? `Fin:  ${format(item.Fecha.endDate, 'dd/MM/yyyy')}`
              : 'Sin fecha final'}
          </Text>
          <Text style={[styles.txtTitleFlat, { color: colorStyles.txtColor }]}>
            {item.Hora?.Tiempo?.hours
              ? `Hora: ${item.Hora.Tiempo.hours}:${item.Hora.Tiempo.minutes}`
              : 'Sin hora'}{' '}
            ⏰
          </Text>
        </View>
      </View>
    );
  };
  //------------------------------------------
  return (
    <View style={styles.viewContainer}>
      <StatusBar style="light" />

      <FlatList
        data={tareas}
        keyExtractor={(item, index) => item.Key || index.toString()}
        renderItem={renderItem}
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.viewContetModal}>
              <TextInput
                editable
                placeholder="Tarea:"
                placeholderTextColor="black"
                maxLength={30}
                onChangeText={setTituloTexto}
                value={tituloTexto}
                style={styles.txtTitle}
              />
              <Text style={styles.txtFechayHora}>
                Aqui va la hora o la fecha
              </Text>
              <Pressable
                style={[styles.button, styles.pressableBtns]}
                onPress={() => abrirCalendario()}
              >
                <Text style={styles.txtPressables}>📅</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.pressableBtns]}
                onPress={() => abrirTimer()}
              >
                <Text style={styles.txtPressables}>⏰</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.pressableBtns]}
                onPress={() => cerrarModal()}
              >
                <Text style={styles.txtPressablesClose}>X</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.btnGuaradar]}
                onPress={() => {
                  GuardarTareas(
                    GuardarYMostrarNotas,
                    tituloTexto,
                    useFecha,
                    useTiempo
                  );
                  cerrarModal();
                }}
              >
                <Text style={styles.txtBtnGuardad}>Guardar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <DatePickerModal
        animationType="slide"
        locale="es"
        mode="range"
        visible={calenVisible}
        onDismiss={() => setCalenVisible(false)}
        onConfirm={(date) => onConfirmDate(date)}
        date={useFecha}
      />
      <TimePickerModal
        visible={timerVisible}
        onDismiss={() => setTimerVisible(false)}
        onConfirm={(Tiempo) => onConfirmTimer(Tiempo)}
        hours={12}
        minutes={14}
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
  extraButton: {
    borderRadius: 12,
    top: -50,
    right: -130,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '20%',
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewContetModal: {
    flexDirection: 'row',
    marginTop: 2,
    height: '95%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pressableBtns: {
    right: -15,
    top: -25,
    width: 30,
    height: 30,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  txtPressables: {
    fontSize: 25,
  },
  txtPressablesClose: {
    marginTop: 5,
    fontSize: 23,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.5)',
  },
  txtTitle: {
    flex: 1,
    top: -25,
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
    backgroundColor: 'white',
    color: 'black',
    maxWidth: 200,
    maxHeight: 50,
  },
  btnGuaradar: {
    top: 90,
    left: 265,
    zIndex: 1,
    position: 'absolute',
    width: 90,
    height: 35,
    backgroundColor: 'blue',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  txtBtnGuardad: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  txtFechayHora: {
    top: 100,
    left: 28,
    color: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
  },
  ContenedorFlatList: {
    flex: 1,
    padding: 10,
    width: '97 %',
    margin: 5,
    borderRadius: 12,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contenedorCheckbox: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedorTxtFlat: {
    width: '80%',
    justifyContent: 'center',
    padding: 5,
  },
  txtTitleFlat: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  txtsFlats: {
    fontSize: 14,
  },
});
export default Calendario;
