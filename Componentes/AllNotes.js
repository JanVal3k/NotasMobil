import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const AllNotes = () => {
  return (
    <View style={styles.viewContent}>
      <Text>AllNotes</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  viewContent: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
});

export default AllNotes;
