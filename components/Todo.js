import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  StyleSheet
} from "react-native";

let id = 0;
const generateId = () => ++id;

export default class Todo extends Component {
  state = {
    todoText: "",
    todos: [{ text: "Todo 1", id: generateId(), toDelete: false }]
  };

  addTodo = () => {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          text: this.state.todoText,
          id: generateId(),
          toDelete: false
        }
      ],
      todoText: ""
    });
  };

  selectToDelete = todoId => {
    this.setState({
      todos: this.state.todos.map(x => {
        if (x.id === todoId) {
          return { ...x, toDelete: !x.toDelete };
        }
        return x;
      })
    });
  };

  deleteTodo = todoId => {
    this.setState({
      todos: this.state.todos.filter(x => x.id !== todoId)
    });
  };

  deleteSelectedCount = () => {
    return this.state.todos.filter(x => x.toDelete).length;
  };

  deleteSelected = () => {
    this.setState({
      todos: this.state.todos.filter(x => !x.toDelete)
    });
  };

  render() {
    return (
      <View>
        <Text>Insert a todo:</Text>
        <View>
          <TextInput
            style={{ borderWidth: 1, padding: 2, borderRadius: 3 }}
            onSubmitEditing={() => this.addTodo()}
            onChangeText={t => this.setState({ todoText: t })}
            value={this.state.todoText}
          />
          <Button onPress={() => this.addTodo()} title="Add Todo" />
          <Button
            disabled={this.deleteSelectedCount() === 0}
            color={"red"}
            onPress={() => this.deleteSelected()}
            title={`Delete Selected (${this.deleteSelectedCount()})`}
          />
        </View>
        <ScrollView>
          {this.state.todos.map((t, i) => {
            return (
              <View key={t.id} style={styles.todo}>
                <Text
                  style={t.toDelete ? styles.redText : null}
                  onPress={() => this.selectToDelete(t.id)}
                >
                  {i + 1} {t.text}
                </Text>
                {t.toDelete && false && (
                  <Button
                    onPress={() => this.deleteTodo(t.id)}
                    title="Delete"
                  />
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  todo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  redText: {
    color: "red"
  }
});
