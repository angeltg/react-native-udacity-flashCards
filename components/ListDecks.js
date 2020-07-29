import React, { Component } from "react";

import { View, Text } from "react-native";
import Deck from "./Deck";

class ListDecks extends Component {
  render() {
    return (
      <View>
        <Text>Este es el componente que lista los decks</Text>
        <Deck />
      </View>
    );
  }
}

export default ListDecks;
