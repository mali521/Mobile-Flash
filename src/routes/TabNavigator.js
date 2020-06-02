import React, { Component } from "react";
import AddDeck from "../components/AddDeck";
import { Feather } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import DeckList from "../components/DeckList";

import { appTheme } from "../../utils/Helper";

const { themeBgColor, lineColor } = appTheme;
const TabNavigator = createMaterialTopTabNavigator(
  {
    Decks: {
      screen: DeckList,
      navigationOptions: {
        title: "Home",
        tabBarIcon: () => <Feather name="home" color="white" size={22} />,
      },
    },
    Add: {
      screen: AddDeck,
      navigationOptions: {
        title: "Add Decks",
        tabBarIcon: () => <Feather name="plus" color="white" size={22} />,
      },
    },
  },
  {
    initialRouteName: "Decks",
    tabBarPosition: "bottom",
    tabBarOptions: {
      showIcon: true,
      labelStyle: {
        fontSize: 14,
        color: "white",
      },
      style: {
        backgroundColor: themeBgColor,
      },
      indicatorStyle: {
        backgroundColor: lineColor,
      },
    },
  }
);

export default createAppContainer(TabNavigator);
