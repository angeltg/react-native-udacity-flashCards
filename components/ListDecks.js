import React, { Component } from "react";
import { Feather } from "@expo/vector-icons";

import { View, StyleSheet, Text, FlatList } from "react-native";
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

  render() {
    const { decks } = this.props;

    if (Object.keys(decks).length === 0) {
      return (
        <View style={styles.empty}>
          <View style={styles.icon}>
            <Feather name="book-open" size={150} color="grey" />
          </View>
          <Text>No Decks</Text>
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
});

export default withNavigation(connect(mapStateToProps)(ListDecks));
