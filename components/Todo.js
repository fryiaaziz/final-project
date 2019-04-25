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
    todos: [{ text: "Todo 1", id: generateId(), toDelete: false }],
    toBeDeleted: new Set()
  };

  history = [];

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

  selectToDelete2 = todoId => {
    this.setState(state => ({
      toBeDeleted: state.toBeDeleted.has(todoId)
        ? (state.toBeDeleted.delete(todoId) && state.toBeDeleted) ||
          state.toBeDeleted
        : state.toBeDeleted.add(todoId)
    }));
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

  deleteSelected2 = () => {
    this.history.push(
      this.state.todos
        .map((x, i) => ({ value: x, index: i }))
        .filter(x => this.state.toBeDeleted.has(x.value.id))
    );

    this.setState({
      todos: this.state.todos.filter(x => !this.state.toBeDeleted.has(x.id)),
      toBeDeleted: new Set()
    });
  };

  undo = () => {
    require("array.prototype.flatmap").shim();

    const lastStep = this.history.pop() || [];

    const lastStepMap = new Map();
    lastStep.forEach(x => {
      lastStepMap.set(x.index, x.value);
    });

    const todos = this.state.todos.concat(Array.from({length: lastStep.length}));

    const update = todos.reverse().flatMap((t, i, a) =>
      lastStepMap.has(a.length - i - 1) ? [t, lastStepMap.get(a.length - i - 1)] : t
    )
    .reverse()
    .filter(Boolean);

    this.setState({
      todos: update
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
            disabled={this.state.toBeDeleted.size === 0}
            color={"red"}
            onPress={() => this.deleteSelected2()}
            title={`Delete Selected (${this.state.toBeDeleted.size})`}
          />

          <Button
            disabled={this.history.length === 0}
            color={"green"}
            onPress={() => this.undo()}
            title={`Undo`}
          />
        </View>
        <ScrollView>
          {this.state.todos.map((t, i) => {
            return (
              <View key={t.id} style={styles.todo}>
                <Text
                  style={t.toDelete ? styles.redText : null}
                  onPress={() => this.selectToDelete2(t.id)}
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
