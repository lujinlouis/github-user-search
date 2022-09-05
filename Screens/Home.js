/**
 * This is the Home page, with a TextInput field and a Search button.
 */


import { View, Text, Button, TextInput, StyleSheet, Image } from "react-native";
import { useState } from "react";

const Home = ({ navigation }) => {
  const [username, setUsername] = useState("");

//   Update the username state when user inputing the username
  const usernameInputHandler = (enteredText) => {
    setUsername(enteredText);
  };

//   Go to the Profile page with the username as the parameter.
  const submitHandler = () => {
    navigation.navigate("Profile", { username: username });
    setUsername("");
  };

  return (
    <View>
      <View style={styles.textContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Input username to start search..."
          onChangeText={usernameInputHandler}
          value={username}
        />

        <View style={styles.button}>
          <Button title="Search" onPress={submitHandler} color="#b180f0" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 100,
    alignItems: "center",
    padding: 10,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#120438",
    width: "100%",
    padding: 8,
  },
  button: {
    width: 100,
    marginTop: 10,
  },
});

export default Home;
