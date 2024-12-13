import {
  Text,
  StyleSheet,
  StatusBar,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useState } from 'react';
//---------------------------------------
import AllNotes from './AllNotes';
import NewNote from './NewNote';
//---------------------------------------
const MostrarAllNotes = () => <AllNotes />;
const MostrarNewNote = () => <NewNote />;
const renderScene = SceneMap({
  first: MostrarAllNotes,
  second: MostrarNewNote,
});
const routes = [
  { key: 'first', title: 'Notas' },
  { key: 'second', title: 'Nueva Nota' },
];
const App2 = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContent}>
        <StatusBar style="light" />
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  safeAreaContent: {
    flex: 1,
    backgroundColor: '#192b42',
  },
});
export default App2;
