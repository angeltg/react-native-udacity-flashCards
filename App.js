import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Deck from "./components/Deck";
import NewDeck from "./components/NewDeck";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Decks" component={Deck} />
        <Tab.Screen name="Add Deck" component={NewDeck} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
