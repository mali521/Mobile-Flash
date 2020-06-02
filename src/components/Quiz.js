import React, { Component } from "react";
import ShowResult from "./ShowResult";
import { appTheme } from "../../utils/Helper";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
} from "react-native";

class DeckQuiz extends Component {
  state = {
    currentQuestion: 0,
    correctCount: 0,
    faceUp: true,
  };

  static getDerivedStateFromProps(props) {
    const { deck } = props.navigation.state.params;
    return { deck };
  }

  handleCorrect = () => {
    this.setState((prevState) => ({
      correctCount: ++prevState.correctCount,
      currentQuestion: ++prevState.currentQuestion,
    }));
  };

  handleIncorrect = () => {
    this.setState((prevState) => ({
      currentQuestion: ++prevState.currentQuestion,
    }));
  };

  toggleFace = () => {
    this.setState((prevState) => ({
      faceUp: !prevState.faceUp,
    }));
  };

  restartQuiz = () => {
    this.setState({
      currentQuestion: 0,
      correctCount: 0,
      faceUp: true,
    });
  };
  render() {
    const { currentQuestion } = this.state;
    const totalQuestions = this.state.deck.questions.length;
    const { question, answer } =
      totalQuestions && currentQuestion < totalQuestions
        ? this.state.deck.questions[currentQuestion]
        : { question: null, answer: null };

    return !totalQuestions ? (
      <View style={styles.root}>
        <Text style={styles.questionAnswerText}>
          There is no question to quiz in this deck
        </Text>
      </View>
    ) : currentQuestion >= totalQuestions ? (
      <ShowResult
        totalQuestions={totalQuestions}
        correctCount={this.state.correctCount}
        deck={this.state.deck}
        restartQuiz={this.restartQuiz}
      />
    ) : (
      <ScrollView>
        <View style={styles.root}>
          <Text style={styles.questionCount}>
            {`${currentQuestion + 1} / ${totalQuestions}`}
          </Text>
          <Text style={styles.questionAnswerText}>
            {this.state.faceUp ? question : answer}
          </Text>
          <TouchableOpacity onPress={this.toggleFace}>
            <Text style={styles.questionAnswerButton}>
              {`SHOW ${this.state.faceUp ? "ANSWER" : "QUESTION"}`}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            // flexDirection: "row",
          }}
        >
          <TouchableHighlight
            style={[styles.button, { backgroundColor: "darkgreen" }]}
            onPress={this.handleCorrect}
          >
            <Text style={styles.answerButtonText}>CORRECT</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={this.handleIncorrect}
          >
            <Text style={styles.answerButtonText}>INCORRECT</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
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

  answerButtonText: {
    fontSize: 15,
    color: "#fff",
  },
  questionAnswerButton: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "red",
    margin: 30,
  },
  questionAnswerText: {
    fontSize: 30,
    color: themeBgColor,
    marginBottom: 30,
    textAlign: "center",
  },
  questionCount: {
    fontSize: 15,
    color: themeBgColor,
    marginBottom: 30,
    alignItems: "flex-start",
    textAlign: "left",
    justifyContent: "flex-start",
  },
  root: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    marginTop: 20,
  },
});

export default DeckQuiz;
