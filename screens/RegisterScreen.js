import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import React, { useState, useLayoutEffect } from "react";

import { Button, Input } from "@rneui/themed";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Sign in",
    });
  }, [navigation]);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("successfully created account");
      setEmail("");
      setPassword("");
      navigation.navigate("Name");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Hey,</Text>
        <Text style={styles.heading}>Create an account</Text>
        <Text style={styles.heading}>
          or{" "}
          <Text
            title="Sign up"
            onPress={() => navigation.navigate("Sign in")}
            style={styles.link}
          >
            Sign In
          </Text>
        </Text>
      </View>

      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <Input
            placeholder="email"
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            onSubmitEditing={handleSignUp}
            style={styles.input}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            containerStyle={styles.button}
            buttonStyle={styles.buttonColor}
            title="Create account"
            onPress={handleSignUp}
          />
        </View>
        <View style={{ height: 50 }}></View>
      </KeyboardAvoidingView>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 120,
    alignItems: "center",
    backgroundColor: "white",
  },
  inputContainer: {
    width: "90%",
  },
  input: {
    backgroundColor: "white",
    color: "#1f2937",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: -2, height: 4 },
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "80%",
    padding: 15,
    borderRadius: 33,
  },
  buttonColor: {
    backgroundColor: "#6366f1",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  buttonOutlineText: {
    color: "#0ea5e9",
    textAlign: "center",
  },
  headingContainer: {
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  link: {
    fontSize: 24,
    color: "#BDCCFF",
  },
});
