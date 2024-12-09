import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value, key) => {
  try {
    const jsonValue = JSON.stringify(value);
    console.log("Esto es lo que tiene el jsonValue: ", jsonValue);
    await AsyncStorage.setItem(`NotaNumero${key}`, jsonValue);
    console.log("nota guardada correctamente");
  } catch (e) {
    throw new Error("No se pudo recuperar el dato");
  }
};
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("my-key");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    throw new Error("No se pudo recuperar el dato");
  }
};

export default { storeData, getData };
