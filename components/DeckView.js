import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Text, Alert, TouchableOpacity, StyleSheet } from "react-native";

import { removeDeck } from "../actions";
import { removeDeckFile } from "../utils/Api";

class DeckView extends Component {
  handleOnPressOpenQuiz = (id, numberQuestions) => {
    if (numberQuestions === 0) {
      Alert.alert(
        "No questions available",
        "Please create a question to start quiz",
        [{ text: "OK" }]
      );
    } else {
      this.props.navigation.navigate("Quiz", { id });
    }
  };
  handleOnPressOpenAddCard = (id) => {
    this.props.navigation.navigate("NewCard", { id });
  };

  removeDeck = (id, name) => {
    Alert.alert("Really!", `Delete ${name} deck`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          this.props.dispatch(removeDeck(id));
          this.back();
          removeDeckFile(id);
        },
      },
    ]);
  };

  back = () => {
    this.props.navigation.navigate("ListDecks");
  };

  render() {
    const { name, id, questions } = this.props.route.params;

    const numberQuestions = questions ? Object.keys(questions).length : 0;
    return (
      <View style={styles.sectionCenter}>
        <Text style={styles.title}>{name}</Text>
        <Text>{numberQuestions} cards</Text>
        <View style={styles.buttonsGroup}>
          <TouchableOpacity
            onPress={() => this.handleOnPressOpenQuiz(id, numberQuestions)}
            style={styles.buttonContainerPrimary}
          >
            <Text style={styles.button}> Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.handleOnPressOpenAddCard(id)}
            style={styles.buttonContainerPrimary}
          >
            <Text style={styles.button}> Add Cards</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => this.removeDeck(id, name)}
          style={styles.buttonContainerSecondary}
        >
          <Text style={styles.button}> Remove Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsGroup: {
    flexDirection: "row",
    padding: 15,
  },
  buttonContainerPrimary: {
    backgroundColor: "#1976d2",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    marginTop: 10,
    marginLeft: 2,
    marginRight: 2,
    elevation: 5,
  },
  buttonContainerSecondary: {
    backgroundColor: "#FFA233",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    marginTop: "20%",
    marginLeft: 2,
    marginRight: 2,
    elevation: 5,
  },
  button: {
    color: "#fff",
    fontSize: 18,
  },
  title: {
    fontSize: 22,
  },
});

export default connect()(DeckView);
