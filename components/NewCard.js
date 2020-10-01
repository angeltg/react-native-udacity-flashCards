import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/index";

class NewCard extends Component {
  state = {
    question: "",
    answer: "",
  };

  saveQuestion = (deck) => {
    this.props.dispatch(handleAddQuestion(this.state, deck));
    this.setState({
      question: "",
      answer: "",
    });
    this.back();
  };

  back = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { id } = this.props.route.params;
    const deck = this.props.decks[id];
    const { name } = deck;

    return (
      <View style={styles.sectionCenter}>
        <Text style={styles.title}>{name}</Text>
        <TextInput
          autofocus={true}
          style={styles.textInput}
          placeholder="Question"
          value={this.state.question}
          onChangeText={(question) => {
            this.setState({ question });
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Answer"
          multiline={true}
          numberOfLines={4}
          value={this.state.answer}
          onChangeText={(answer) => {
            this.setState({ answer });
          }}
        />
        <View>
          <TouchableHighlight
            underlayColor="#63a4ff"
            style={styles.buttonContainerPrimary}
            onPress={() => this.saveQuestion(deck)}
          >
            <Text style={styles.button}>Save</Text>
          </TouchableHighlight>
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
  textInput: {
    color: "#BBBBBB",
    fontSize: 20,
    borderColor: "grey",
    borderWidth: 1,
    height: 40,
    width: 300,
    marginBottom: 15,
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
    marginBottom: 8,
  },
});

export default connect(mapStateToProps)(NewCard);
