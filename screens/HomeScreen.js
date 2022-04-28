import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase-config";
import {
  doc,
  getDocs,
  collection,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

import { Icon } from "@rneui/themed";
import Task from "../components/Task";

const HomeScreen = ({ navigation, user }) => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [document, setDocument] = useState();

  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);

      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
    const usersCopy = [...users];

    const arr = usersCopy.filter((profile) => {
      return profile.uid === auth.currentUser?.uid;
    });

    const currentUser = arr[0];
    setDocument(currentUser);
    const userId = currentUser?.id;
    setTaskItems(currentUser?.tasks);
  }, []);

  const handleAddTask = () => {
    console.log(taskItems.length);
    if (taskItems?.length < 5) {
      Keyboard.dismiss();
      const taskCopy = task;
      setTaskItems((currItems) => [...currItems, task]);
      console.log(taskItems, "task items");
      setTask(null);

      const updateRef = doc(db, "users", document?.id);
      updateDoc(updateRef, {
        tasks: arrayUnion(taskCopy),
      });
    } else {
      alert("You have 5 tasks already");
    }
  };

  return (
    <View style={styles.container}>
      {/* Todays task's */}
      <View style={styles.tasksWrapper}>
        <Icon
          style={{}}
          name="person"
          onPress={() => navigation.navigate("Profile")}
        />

        <Text style={styles.heading}>
          {auth.currentUser?.displayName
            ? auth.currentUser?.displayName + `'s`
            : `Today's`}{" "}
          tasks
        </Text>

        <View style={styles.items}>
          {/* This is where the tasks will go */}
          {taskItems?.map((item, index) => {
            return (
              <Task
                key={index}
                text={item}
                index={index}
                taskItems={taskItems}
                setTaskItems={setTaskItems}
                document={document}
              />
            );
          })}
        </View>
      </View>

      {/* Write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text styles={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BDCCFF",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: "white",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
  headingContainer: {
    backgroundColor: "#FFF",
    paddingLeft: 20,
    paddingTop: 70,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
});
