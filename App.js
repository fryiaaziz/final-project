import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Todo from './components/Todo';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Todo />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});
