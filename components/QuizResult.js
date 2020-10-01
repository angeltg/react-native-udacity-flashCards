import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import { withNavigation } from "react-navigation";
import {
  getDailyReminderValue,
  clearLocalNotification,
  setLocalNotification,
} from "../utils/Notifications";

class QuizResult extends Component {
  handleRestartQuiz = (id) => {
    this.props.navigation.navigate("Quiz", { id });
  };

  handleBackDeck = (deck) => {
    this.props.navigation.navigate("DeckView", { deck });
  };

  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }

  render() {
    const { decks } = this.props;
    const { id, totalQuestions, correctAnswer } = this.props.route.params;
    const deck = decks[id];
    const { name } = deck;
    const totalFaild = totalQuestions - correctAnswer;

    return (
      <View style={styles.sectionCenter}>
        <Text style={styles.title}>{name}</Text>
        <Text>
          {totalQuestions}/{totalQuestions}
        </Text>
        <Text>Correct: {correctAnswer}</Text>
        <Text>Faild: {totalFaild}</Text>

        <View style={styles.buttonsGroup}>
          <TouchableOpacity
            onPress={() => this.handleRestartQuiz(id)}
            style={styles.buttonContainerPrimary}
          >
            <Text style={styles.button}>Restart quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.handleBackDeck(deck)}
            style={styles.buttonContainerPrimary}
          >
            <Text style={styles.button}>Back to deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(decks = {}) {
  return {
    decks,
  };
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

  button: {
    color: "#fff",
    fontSize: 18,
  },
  title: {
    fontSize: 22,
  },
  question: {
    fontSize: 20,
  },
});

export default withNavigation(connect(mapStateToProps)(QuizResult));
