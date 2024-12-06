import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Modal, Button, Portal, TextInput } from "react-native-paper";
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
        <TextInput
          label="Título de la Nota"
          value={tituloTexto}
          mode="outlined"
          style={styles.txtTitulo}
          onChangeText={setTituloTexto}
          multiline={false}
        />
        <TextInput
          label="Contenido de la Nota"
          value={notaTexto}
          mode="outlined"
          style={styles.txtNota}
          onChangeText={setNotaTexto}
          multiline={true}
          textAlignVertical="top"
        />
        <Button
          icon="close"
          style={styles.btnClose}
          buttonColor="#F1AC20"
          textColor="#fff"
          mode="elevated"
          onPress={hideModal}
        ></Button>
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
    justifyContent: "flex-start",
    alignItems: "center",
  },
  txtTitulo: {
    fontSize: 18,
    width: "100%",
    marginBottom: 10,
  },
  txtNota: {
    fontSize: 16,
    width: "100%",
    height: 590,
    marginBottom: 10,
    textAlignVertical: "top",
  },
  btnClose: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotaNueva;
