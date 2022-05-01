import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "@rneui/themed";
import { updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

const NameScreen = ({ navigation }) => {
  const [name, setName] = useState(null);

  const usersCollectionRef = collection(db, "users");

  const handleNameUpdate = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      // await addDoc(usersCollectionRef, {
      //   displayName: name,
      //   uid: auth.currentUser?.uid,
      //   tasks: [],
      // });
      await setDoc(doc(db, "users", auth.currentUser?.uid), {
        displayName: name,
        tasks: [],
        uid: auth.currentUser?.uid,
      });
      navigation.navigate("Home");
      setName("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>What should</Text>
        <Text style={styles.heading}>I call you?</Text>
      </View>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <Input
            placeholder="name"
            // autofocus
            value={name}
            onChangeText={(text) => setName(text)}
            type="text"
            style={styles.input}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            containerStyle={styles.button}
            buttonStyle={styles.buttonColor}
            title="Save"
            onPress={handleNameUpdate}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default NameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 140,
    alignItems: "center",
    backgroundColor: "white",
  },
  headingContainer: {
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 80,
    justifyContent: "flex-start",
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
    borderRadius: 33,
    width: "80%",
    margin: 5,
  },
  buttonColor: {
    backgroundColor: "#6366f1",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
