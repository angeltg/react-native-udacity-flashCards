import React, { Component } from "react";

import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { withNavigation } from "react-navigation";

import { connect } from "react-redux";

import { handleGetDecks } from "../actions";
import Deck from "./Deck";

class ListDecks extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetDecks());
  }

  handleOnPressOpenDeck = (deck) => {
    this.props.navigation.navigate("DeckView", deck);
  };
  handleOnPressNewDeck = (deck) => {
    this.props.navigation.navigate("NewDeck");
  };

  render() {
    const { decks } = this.props;

    if (Object.keys(decks).length === 0) {
      return (
        <View style={styles.empty}>
          <Text>No Decks yet!</Text>
          <View>
            <TouchableHighlight
              underlayColor="#63a4ff"
              style={styles.buttonContainerPrimary}
              onPress={this.handleOnPressNewDeck}
            >
              <Text style={styles.button}>Add new deck</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.listItems}>
        <FlatList
          data={Object.keys(decks)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Deck
              deck={decks[item]}
              onPress={() => this.handleOnPressOpenDeck(decks[item])}
            />
          )}
          ListHeaderComponent={<Text style={styles.title}>List Decks</Text>}
        />
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
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    opacity: 0.2,
  },
  listItems: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
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
});

export default withNavigation(connect(mapStateToProps)(ListDecks));
