import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import { Button } from "@rneui/themed";

const ProfileScreen = ({ navigation }) => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        alert("signed out successfully");
        navigation.replace("Sign in");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hey, {auth.currentUser.displayName}</Text>
      <View style={styles.wrapper}>
        <Text
          title="Tasks"
          onPress={() => navigation.navigate("Home")}
          style={styles.link}
        >
          Tasks
        </Text>
        <Button title="Sign out" onPress={handleSignOut} />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 70,
    alignItems: "center",
    backgroundColor: "white",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  wrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  link: {
    fontSize: 24,
    color: "#BDCCFF",
    padding: 30,
  },
});
