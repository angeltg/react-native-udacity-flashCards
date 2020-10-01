import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListDecks from "./components/ListDecks";
import NewDeck from "./components/NewDeck";
import Deck from "./components/Deck";
import DeckView from "./components/DeckView";
import Quiz from "./components/Quiz";
import NewCard from "./components/NewCard";
import QuizResult from "./components/QuizResult";
import store from "./store";

const Tab = createBottomTabNavigator();
Tab.navigationOptions = {
  // Hide the header from root stack
  header: null,
};

const Stack = createStackNavigator();

Stack.navigationOptions = {
  header: null,
};

function StackScreemList() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListDeck"
        options={{ title: "Mobile Flashcards" }}
        component={ListDecks}
      />
      <Stack.Screen
        name="DeckView"
        options={{ title: "Your deck" }}
        component={DeckView}
      />
      <Stack.Screen
        name="Quiz"
        options={{ title: "Enjoy quiz" }}
        component={Quiz}
      />
      <Stack.Screen
        name="NewCard"
        options={{ title: "Create a new deck" }}
        component={NewCard}
      />
      <Stack.Screen
        name="QuizResult"
        options={{ title: "Quiz result" }}
        component={QuizResult}
      />
    </Stack.Navigator>
  );
}
function StackScreemNewDeck() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NewDeck" component={NewDeck} />
      <Stack.Screen name="DeckView" component={DeckView} />
    </Stack.Navigator>
  );
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="ListDecks"
              component={StackScreemList}
              options={{ title: "List Decks" }}
            />
            <Tab.Screen
              name="AddDeck"
              component={StackScreemNewDeck}
              options={{ title: "Add Deck" }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
