import { StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';

const NewNote = () => {
  return (
    <View style={styles.viewContent}>
      <Text>New Note</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  viewContent: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
});

export default NewNote;
