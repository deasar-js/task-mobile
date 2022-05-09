import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import NameScreen from "./screens/NameScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator();

// const globalScreenOptions = {
//   headerStyle: { backgroundColor: "#6366f1" },
//   headerTitleStyle: { color: "white" },
//   headerTintColor: "white",
// };

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log(user, "user app.js");
      setUser(currentUser);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Sign in" component={LoginScreen} />
        <Stack.Screen name="Sign up" component={RegisterScreen} />
        <Stack.Screen name="Name" component={NameScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          user={user}
          setUser={setUser}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
