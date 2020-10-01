import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { connect } from "react-redux";

import { createStackNavigator } from "@react-navigation/stack";
import { withNavigation } from "react-navigation";
import { newDeck } from "../actions";

import { saveDeck } from "../utils/Api";
import DeckView from "./DeckView";

class NewDeck extends Component {
  state = {
    name: "",
  };

  saveDeck = ({ navigation }) => {
    const { name } = this.state;

    saveDeck(name).then((deck) => {
      this.props.dispatch(newDeck(deck));
      this.props.navigation.navigate("DeckView", deck);
    });

    this.setState({ name: "" });
  };

  render() {
    const Stack = createStackNavigator();

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextInput
          autofocus={true}
          placeholder="Deck title"
          style={styles.textInput}
          value={this.state.name}
          onChangeText={(name) => {
            this.setState({ name });
          }}
          autoCapitalize="words"
        />
        <TouchableHighlight
          underlayColor="#63a4ff"
          style={styles.buttonContainer}
          onPress={this.saveDeck}
        >
          <Text style={styles.button}>Create Deck</Text>
        </TouchableHighlight>
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
  textInput: {
    color: "#BBBBBB",
    fontSize: 20,
    borderColor: "grey",
    borderWidth: 1,
    height: 40,
    width: 300,
  },
  footer: {
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: "#1976d2",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    marginTop: 10,
    elevation: 5,
  },
  button: {
    color: "#fff",
    fontSize: 18,
  },
});

export default withNavigation(connect(mapStateToProps)(NewDeck));
