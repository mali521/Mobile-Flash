import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import { appTheme } from "../../utils/Helper";
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from "react-native";

class AddDeck extends Component {
  state = {
    deckName: "",
  };

  handleDeckNameInputChange = (newInput) => {
    this.setState({
      deckName: newInput,
    });
  };

  handleSubmit = () => {
    const { handleNewDeckSubmition } = this.props.screenProps;
    const userInput = this.state.deckName;

    if (userInput) {
      if (userInput === "dateLatestAttempted") {
        alert(
          "dateLatestAttempted is a reserve word in this app, kindly use another Title for the Deck"
        );
      } else {
        handleNewDeckSubmition(userInput.trim()).then((newDeck) => {
          this.setState({ deckName: "" });
          this.props.navigation.navigate("Deck", { deck: newDeck });
        });
      }
    } else {
      alert("Deck name cannot be submitted empty!");
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.root}>
        <Text style={styles.header}>ADD DECK</Text>
        <Text style={styles.subHead}>
          What would be the title of your new deck?
        </Text>
        <View style={{ alignItems: "center" }}>
          <TextInput
            value={this.state.deckName}
            onChangeText={this.handleDeckNameInputChange}
            style={styles.textbox}
          />
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TouchableHighlight style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.submit}>SUBMIT</Text>
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const { themeBgColor, lineColor } = appTheme;
const styles = StyleSheet.create({
  button: {
    width: "90%",
    marginTop: 20,
    height: 40,
    borderRadius: 6,
    alignItems: "center",
    backgroundColor: themeBgColor,
    borderBottomColor: lineColor,
    borderBottomWidth: 2,
    justifyContent: "center",
  },
  root: {
    flex: 1,
    textAlign: "center",
    marginTop: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: themeBgColor,
    marginBottom: 20,
    textAlign: "center",
  },
  subHead: {
    fontSize: 18,
    marginBottom: 25,
    textAlign: "center",
  },
  textbox: {
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    paddingLeft: 5,
    width: "90%",
    height: 40,
    borderRadius: 10,
    fontSize: 18,
  },
  submit: {
    fontSize: 20,
    color: "white",
  },
});

export default withNavigation(AddDeck);
