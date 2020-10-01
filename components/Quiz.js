import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import { withNavigation } from "react-navigation";

class Quiz extends Component {
  state = {
    questionIndex: 0,
    correctAnswer: 0,
    showAnswer: false,
  };

  handleAnswer = (answer, totalQuestions, id) => {
    let addOneCorrectMore = this.state.correctAnswer;
    if (answer) {
      addOneCorrectMore = addOneCorrectMore + 1;
      this.setState({ correctAnswer: addOneCorrectMore });
    }
    const addOneMore = this.state.questionIndex + 1;
    if (addOneMore === totalQuestions) {
      this.props.navigation.navigate("QuizResult", {
        id,
        correctAnswer: addOneCorrectMore,
        totalQuestions: totalQuestions,
      });
      this.setState({ questionIndex: 0, correctAnswer: 0, showAnswer: false });
    } else {
      this.setState({ questionIndex: addOneMore, showAnswer: false });
    }
  };

  renderButtonAnswer = () => {
    return (
      !this.state.showAnswer && (
        <TouchableOpacity
          onPress={() => this.setState({ showAnswer: true })}
          style={styles.buttonContainerGreen}
        >
          <Text style={styles.button}>Show Answer</Text>
        </TouchableOpacity>
      )
    );
  };
  renderAnswer = (questions) => {
    return (
      this.state.showAnswer && (
        <Text style={styles.question}>
          Answer: {questions[this.state.questionIndex].answer}
        </Text>
      )
    );
  };

  render() {
    const { decks } = this.props;
    const { id } = this.props.route.params;
    const deck = decks[id];
    const totalQuestions = deck.questions.length;
    const { questions, name } = deck;
    const answer = this.renderAnswer(questions);
    const buttonAnswer = this.renderButtonAnswer();

    return (
      <View style={styles.sectionCenter}>
        <Text style={styles.title}>{name}</Text>
        <Text>
          {this.state.questionIndex}/{totalQuestions}
        </Text>
        <Text style={styles.question}>
          Question: {questions[this.state.questionIndex].question}
        </Text>
        <View>
          {buttonAnswer}
          {answer}
        </View>
        <View style={styles.buttonsGroup}>
          <TouchableOpacity
            onPress={() => this.handleAnswer(true, totalQuestions, id)}
            style={styles.buttonContainerPrimary}
          >
            <Text style={styles.button}>CORRECT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.handleAnswer(false, totalQuestions, id)}
            style={styles.buttonContainerSecondary}
          >
            <Text style={styles.button}>INCORRECT</Text>
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
  buttonContainerGreen: {
    backgroundColor: "#2DB711",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    marginTop: 10,
    marginLeft: 2,
    marginRight: 2,
    elevation: 5,
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
    backgroundColor: "red",
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

export default withNavigation(connect(mapStateToProps)(Quiz));
