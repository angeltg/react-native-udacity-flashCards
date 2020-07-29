import React, { Component } from "react";

import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DeckView from "./DeckView";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={() => navigation.navigate("DeckView")}>
        <Text>Deck1</Text>
        <Text>2 cards</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();

class Deck extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="DeckView" component={DeckView} />
      </Stack.Navigator>
    );
  }
}

export default Deck;
