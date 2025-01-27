import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  Text,
  Pressable,
  Alert,
  TouchableOpacity,
  FlatList,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, Checkbox } from 'react-native-paper';
import GuardarYMostrarNotas from './Clases/GuardarYMostrarNotas';
import { useEstadoGlobal } from './Clases/hookCambioEstado';
import NotificacionesService from './Clases/crearNotificaciones';
import * as Notifications from 'expo-notifications';
import { es } from 'date-fns/locale';
import { format, set } from 'date-fns';
//------------------------------------------
//------------------------------------------

const Calendario = () => {
  const { estadoGlobal, setEstadoGlobal } = useEstadoGlobal();
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState(false);
  const [useFecha, setUseFecha] = useState(new Date());
  const [useTiempo, setUseTiempo] = useState(new Date());
  const [horaActual, setHoraActual] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tituloTexto, setTituloTexto] = useState('');
  const [tareaSelect, setTareaSelect] = useState({});
  const [colors, setColors] = useState({});
  const [btnBorrarVisible, setBtnBorrarVisible] = useState({});
  const [loading, setLoading] = useState(true);

  const abrirCalendario = () => {
    setShowDatePicker(true);
  };

  const abrirTimer = () => {
    setShowTimePicker(true);
  };
  const onChangeFecha = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setUseFecha(selectedDate);
    }
  };
  //---------------------------------
  useEffect(() => {
    setLoading(true);
    if (estadoGlobal) {
      const actualizarTareas = async () => {
        try {
          const tareasActualizadas = await GuardarYMostrarNotas.getAllTareas();
          setTareas(tareasActualizadas);
          setHoraActual(new Date());
          setEstadoGlobal(false);
        } catch (error) {
          console.error('Error actualizando tareas:', error);
        }
      };
      actualizarTareas().finally(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
      });
    }
  }, [estadoGlobal]);
  //---------------------------------
  useEffect(() => {
    setLoading(true);
    const cargarTareas = async () => {
      try {
        const tareasGuardadas = await GuardarYMostrarNotas.getAllTareas();
        setTareas(tareasGuardadas);
        setHoraActual(new Date());
      } catch (error) {
        console.error('Error cargando tareas:', error);
      }
    };

    cargarTareas().finally(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    });
  }, []);
  //---------------------------------
  const onChangeTiempo = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setUseTiempo(selectedTime);
    }
  };
  //---------------------------------
  const cerrarModal = () => {
    setNuevaTarea(false);
  };

  const GuardarTareas = async (storageService, titulo, fecha, tiempo) => {
    if (!titulo.trim()) {
      Alert.alert('El nombre de la tarea no puede estar vacío');
      return;
    }
    try {
      const fechaValida = fecha instanceof Date ? fecha : new Date(fecha);

      if (isNaN(fechaValida.getTime())) {
        Alert.alert('Error', 'La fecha seleccionada no es válida');
        return;
      }
      setLoading(true);
      const tarea = {
        dateKey: Date.now().toString(),
        Key: Date.now().toString(),
        Titulo: titulo,
        Fecha: fechaValida,
        Hora: tiempo,
      };
      await storageService.storeDatepicker(tarea);
      await NotificacionesService.programarNotificacion(tarea);
      borrarTxtFechyHora();
      setEstadoGlobal(true);
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la tarea');
      console.error('Error al guardar tarea:', error);
    }
  };
  //------------------------------------------------------
  const toggleCheck = (item) => {
    setTareaSelect((prev) => ({
      ...prev,
      [item.dateKey]: !prev[item.dateKey],
    }));
    setColors((prevColors) => {
      const updatedColors = { ...prevColors };
      if (!prevColors[item.dateKey]) {
        updatedColors[item.dateKey] = { txtColor: 'white', bgColor: 'black' };
      } else {
        delete updatedColors[item.dateKey];
      }
      return updatedColors;
    });
    setBtnBorrarVisible((prevVisible) => {
      const updatedVisible = { ...prevVisible };

      if (!prevVisible[item.dateKey]) {
        updatedVisible[item.dateKey] = true;
      } else {
        updatedVisible[item.dateKey] = false;
      }

      return updatedVisible;
    });
  };

  const borrarTarea = (keyNota) => {
    setLoading(true);
    if (GuardarYMostrarNotas.deleteTarea(keyNota)) {
      setEstadoGlobal(true);
    }
  };

  const tareaSiyNo = (key) => {
    Alert.alert(
      'Esta acción no se puede deshacer.',
      '¿Estás seguro que quiere borrar la tarea?',
      [
        {
          text: 'NO',
          onPress: () => console.log('Presionaste NO'),
          style: 'cancel',
        },
        {
          text: 'SI',
          onPress: () => {
            if (borrarTarea(key)) {
              setEstadoGlobal(true);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const borrarTxtFechyHora = () => {
    setTituloTexto('');
    setUseFecha(new Date());
    setUseTiempo(new Date());
  };

  const renderItem = ({ item }) => {
    const colorStyles = colors[item.dateKey] || {
      txtColor: 'black',
      bgColor: 'white',
    };
    //------------------------------------
    const fechaModificar = new Date(item.Fecha);
    const horaModificar = new Date(item.Hora);
    horaModificar.setFullYear(fechaModificar.getFullYear());
    horaModificar.setMonth(fechaModificar.getMonth());
    horaModificar.setDate(fechaModificar.getDate());

    const fechaTarea = horaModificar;

    //------------------------------------
    const formatearFecha = (fecha) => {
      try {
        return format(new Date(fecha), 'dd/MM/yyyy');
      } catch (error) {
        console.error('Error al formatear fecha:', error);
        return 'Fecha inválida';
      }
    };
    //------------------------------------
    const formatearHora = (hora) => {
      return format(hora, 'hh:mm');
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
            status={tareaSelect[item.dateKey] ? 'checked' : 'unchecked'}
            onPress={() => toggleCheck(item)}
          />
        </View>
        <View style={styles.contenedorTxtFlat}>
          <Text style={[styles.txtTitleFlat, { color: colorStyles.txtColor }]}>
            Titulo: {item.Titulo}
          </Text>
          <Text style={[styles.txtTitleFlat, { color: colorStyles.txtColor }]}>
            Fecha: {formatearFecha(item.Fecha)}
          </Text>
          <Text style={[styles.txtTitleFlat, { color: colorStyles.txtColor }]}>
            Hora: {formatearHora(item.Hora)} ⏰
          </Text>
          {fechaTarea <= horaActual && (
            <Text style={[styles.txtVencido, { color: colorStyles.txtColor }]}>
              Tarea vencida...
            </Text>
          )}
          {btnBorrarVisible[item.dateKey] && (
            <Pressable
              style={styles.btnBorrarTarea}
              onPress={() => tareaSiyNo(item.Key)}
            >
              <Text style={styles.txtBorrarTarea}>🗑️</Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.viewContainer}>
      <StatusBar style="light" />
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#192b42',
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <>
          <FlatList
            data={tareas}
            keyExtractor={(item, index) => item.Key || index.toString()}
            renderItem={renderItem}
          />

          <TouchableOpacity
            style={styles.extraButton}
            onPress={() => setNuevaTarea(true)}
          >
            <Text style={styles.extraButtonText}>+</Text>s
          </TouchableOpacity>
        </>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={nuevaTarea}
        onRequestClose={() => {
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
                {format(useFecha, 'dd/MM/yyyy')} y {format(useTiempo, 'HH:mm')}
              </Text>

              <Pressable
                style={[styles.button, styles.pressableBtns]}
                onPress={abrirCalendario}
              >
                <Text style={styles.txtPressables}>📅</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.pressableBtns]}
                onPress={abrirTimer}
              >
                <Text style={styles.txtPressables}>⏰</Text>
              </Pressable>

              {showDatePicker && (
                <DateTimePicker
                  value={useFecha}
                  mode="date"
                  display="default"
                  onChange={onChangeFecha}
                  locale="es"
                />
              )}

              {showTimePicker && (
                <DateTimePicker
                  value={useTiempo}
                  mode="time"
                  display="default"
                  onChange={onChangeTiempo}
                  locale="es"
                />
              )}

              <Pressable
                style={[styles.button, styles.pressableBtns]}
                onPress={cerrarModal}
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
  extraButton2: {
    borderRadius: 12,
    top: -50,
    right: -100,
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
    width: '97%',
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
    width: '70%',
    justifyContent: 'center',
    padding: 5,
  },
  txtTitleFlat: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  txtVencido: {
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.3,
  },
  txtsFlats: {
    fontSize: 14,
  },
  btnBorrarTarea: {
    zIndex: 10,
    width: 40,
    height: 40,
    position: 'absolute',
    right: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBorrarTarea: {
    fontSize: 20,
  },
});
export default Calendario;
