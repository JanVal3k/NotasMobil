import {
  Text,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useState } from 'react';

//---------------------------------------
import AllNotes from './AllNotes';
import NewNote from './NewNote';
import Calendario from './Calendario';
import { ProvedorEstado } from './Clases/hookCambioEstado';

//---------------------------------------

const MostrarAllNotes = () => <AllNotes />;
const MostrarNewNote = () => <NewNote />;
const renderScene = SceneMap({
  first: MostrarAllNotes,
  second: MostrarNewNote,
  third: Calendario,
});
const routes = [
  { key: 'first', title: 'Notas' },
  { key: 'second', title: 'Nueva Nota' },
  { key: 'third', title: 'Calendario' },
];
const App2 = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  return (
    <ProvedorEstado>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeAreaContent}>
          <StatusBar style="light" />
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={(props) => {
              return <TabBar {...props} style={styles.tabBar} />;
            }}
            style={styles.tabBarStyle}
          />
          {index === 0 && (
            <TouchableOpacity
              style={styles.extraButton}
              onPress={() => setIndex(1)}
            >
              <Text style={styles.extraButtonText}>+</Text>
            </TouchableOpacity>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </ProvedorEstado>
  );
};
const styles = StyleSheet.create({
  safeAreaContent: {
    flex: 1,
    backgroundColor: '#192b42',
  },
  tabBar: {
    backgroundColor: '#192b42',
  },
  extraButton: {
    borderRadius: 12,
    top: -50,
    right: -300,
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
});
export default App2;
