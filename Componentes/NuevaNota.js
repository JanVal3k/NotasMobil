import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Modal, Portal } from "react-native-paper";
//---------------------------------------------
const NotaNueva = ({ onClick }) => {
  //---------------------------------------------
  const [modalVisual, setModalVisual] = useState(true);
  const [tituloTexto, setTituloTexto] = useState("");
  const [notaTexto, setNotaTexto] = useState("");
  //---------------------------------------------
  const hideModal = () => {
    setModalVisual(false);
    onClick(null);
  };

  return (
    <Portal>
      <StatusBar style="light" />
      <Modal
        visible={modalVisual}
        onDismiss={hideModal}
        contentContainerStyle={styles.notaNuevaContainer}
      >
        <SafeAreaView style={styles.SafeAreaViewContainer}>
          <TextInput
            editable
            multiline
            numberOfLines={1}
            placeholder="Titulo:"
            placeholderTextColor="#6B6B6B"
            onChangeText={setTituloTexto}
            value={tituloTexto}
            color="#FFF"
            style={styles.txtTitulo}
          />
          <TextInput
            editable
            multiline={true}
            placeholder="Nota:"
            placeholderTextColor="#6B6B6B"
            onChangeText={setNotaTexto}
            value={notaTexto}
            color="#FFF"
            style={styles.txtNota}
          />
        </SafeAreaView>
        <Pressable style={styles.btnConfiguracion} onPress={hideModal}>
          <Text style={{ fontSize: 18 }}>⚙️</Text>
        </Pressable>
        <Pressable style={styles.btnClose} onPress={hideModal}>
          <Text style={{ fontSize: 18, color: "black" }}>X</Text>
        </Pressable>
        <Pressable style={styles.btnGuardar} onPress={hideModal}>
          <Text style={{ fontSize: 18 }}>💾</Text>
        </Pressable>
        {/* <Pressable style={styles.btnEditar} onPress={hideModal}>
          <Text style={{ fontSize: 18 }}>📝</Text>
        </Pressable> */}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  notaNuevaContainer: {
    width: "90%",
    height: 750,
    padding: 20,
    marginLeft: 20,
    backgroundColor: "white",
    borderRadius: 15,
    justifyContent: "",
    alignItems: "center",
  },
  SafeAreaViewContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 0,
    marginLeft: 0,
    backgroundColor: "white",
    borderRadius: 15,
    justifyContent: "flex-start",
    alignItems: "end",
  },
  txtTitulo: {
    fontSize: 18,
    width: "100%",
    marginBottom: 10,
    backgroundColor: "#6A9FA6",
    borderRadius: 10,
  },
  txtNota: {
    fontSize: 16,
    width: "100%",
    height: 590,
    marginBottom: 10,
    textAlignVertical: "top",
    backgroundColor: "#6A9FA6",
    borderRadius: 10,
  },
  btnClose: {
    position: "absolute",
    backgroundColor: "#F1AC20",
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  btnConfiguracion: {
    position: "absolute",
    backgroundColor: "#F1AC20",
    bottom: 20,
    right: 63,
    width: 40,
    height: 40,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  btnGuardar: {
    position: "absolute",
    backgroundColor: "#F1AC20",
    bottom: 20,
    right: 106,
    width: 40,
    height: 40,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  // btnEditar: {
  //   position: "absolute",
  //   backgroundColor: "#F1AC20",
  //   bottom: 20,
  //   right: 149,
  //   width: 40,
  //   height: 40,
  //   borderRadius: 15,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});

export default NotaNueva;
