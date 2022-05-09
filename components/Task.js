import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { auth, db } from "../firebase-config";
import { doc, updateDoc, setDoc } from "firebase/firestore";

const Task = ({ text, index, taskItems, setTaskItems }) => {
  const [complete, setComplete] = useState(false);

  const updateRef = doc(db, "users", auth.currentUser?.uid);

  const removeTask = async (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    await updateDoc(updateRef, {
      tasks: itemsCopy,
    });
  };

  const handleCompleteTask = async (index) => {
    setComplete(!complete);
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity
          style={styles.square}
          onPress={() => handleCompleteTask(index)}
        ></TouchableOpacity>
        <Text style={!complete ? styles.itemText : styles.completedText}>
          {text}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.circular}
        onPress={() => removeTask(index)}
      ></TouchableOpacity>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    borderRadius: 5,
    backgroundColor: "#FDB5A5",
    opacity: 0.5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  completedText: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#FDB5A5",
    borderWidth: 2,
    borderRadius: 5,
  },
});
