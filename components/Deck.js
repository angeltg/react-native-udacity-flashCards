import React, { Component } from "react";

import { Image, StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";

const Deck = (props) => {
  const { onPress, deck } = props;
  const { questions, name } = deck;

  const numberQuestions = questions ? Object.keys(questions).length : 0;
  return (
    <TouchableOpacity onPress={() => onPress(deck)}>
      <View style={styles.container}>
        <Icon name="md-book" size={50} color="#1976d2" style={styles.image} />
        <View>
          <Text>{name}</Text>
          <Text>{numberQuestions} cards</Text>
        </View>
        <Icon
          name="md-arrow-dropright"
          size={28}
          color="black"
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  icon: {
    marginLeft: "auto",
    paddingTop: 15,
  },
});

export default Deck;
