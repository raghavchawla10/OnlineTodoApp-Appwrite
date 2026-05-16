import { useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, StyleSheet, TouchableOpacity, Modal, Button, TextInput } from "react-native";
import { config, database } from "./appwriteConfig";

export default function Index() {
  const [click, setClick] = useState(false);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState([]);
  const [temp, setTemp] = useState("");
  const [load, setLoad] = useState(false);
  
  const [error, setError] = useState(null)
  

  useEffect(()=>{
    getdATA()

  } , [])
  const getdATA = async () => {
    try{
      const result = await database.listDocuments(config.db, config.col.todo)
      setName(result.documents)
    } catch(error){
      setError(error)
    }

  }
  const removeTodo = async (item) => {
    try{
      const newTodo = name.filter((todo) => todo.$id !== item.$id);
      await database.deleteDocument(config.db , config.col.todo , item.$id)
      setName(newTodo);
    } catch(error){
      setError(error)
    }
    // saveTodos(newTodos); // persist after removal
  };

  const addTodo = async () => {
  setVisible(false);
  if (!temp.trim()) return;

  try {
    // create in Appwrite
    await database.createDocument(
      config.db,
      config.col.todo,
      "unique()", // auto-generate ID
      {
        taskId:10,
        title: temp , // must match your schema fiel
        isCompleted: false
      }
    );

    // refresh list from Appwrite
    const result = await database.listDocuments(config.db, config.col.todo);
    setName(result.documents);

    // clear input
    setTemp("");
  } catch (error) {
    console.log("Error adding:", error);
    setError(error.message);
  }
};


  // Load saved todos on startup
  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const saved = await AsyncStorage.getItem("todos");
  //       if (saved) setName(JSON.parse(saved));
  //     } catch (e) {
  //       console.log("Error loading", e);
  //     }
  //     setLoad(true);
  //   };
  //   loadData();
  // }, []);

  // // Helper to save todos
  // const saveTodos = async (todos) => {
  //   try {
  //     await AsyncStorage.setItem("todos", JSON.stringify(todos));
  //   } catch (e) {
  //     console.log("Error saving", e);
  //   }
  // };

  // // Remove todo
  // const removeTodo = (item) => {
  //   const newTodos = name.filter((todo) => todo !== item);
  //   setName(newTodos);
  //   saveTodos(newTodos); // persist after removal
  // };

  // // Add todo
  // const addTodo = () => {
  //   setVisible(false);
  //   if (temp.trim()) {
  //     const newTodos = [...name, temp];
  //     setName(newTodos);
  //     saveTodos(newTodos); // persist after adding
  //     setTemp("");
  //   }
  // };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { setClick(!click); setVisible(true); }}>
        <View style={styles.fab}>
          <Text style={styles.icon}>+</Text>
        </View>
      </TouchableOpacity>

      {/* <Text>{load ? "yes" : "no"}</Text> */}

      <Text style={styles.emptyText}>
        {name.length === 0 ? "No Content To Show !!\nCreate Some Todos To See It Here" : "Available Todos"}
      </Text>


      {name.map((item, index) => (
        <View key={index} style={styles.todoRow}>
          {/* Fake radio button */}
          <TouchableOpacity onPress={() => removeTodo(item)} style={styles.radioOuter}>
            <View style={styles.radioInner} />
          </TouchableOpacity>
          <Text style={styles.todoText}>{item.title}</Text>
        </View>
      ))}

      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Text>Todo-name</Text>
            <TextInput
              value={temp}
              onChangeText={setTemp}
              placeholder="Enter todo"
              style={styles.input}
            />
            <Button title="Add" onPress={addTodo} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fab: {
    backgroundColor: "purple",
    borderRadius: 25,
    height: 50,
    width: 50,
    position: "absolute",
    top: 550, // anchored nicely
    right: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { color: "white", fontSize: 24, fontWeight: "bold" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 250,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  todoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    marginLeft: 10,
    top: 0
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "purple",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "purple",
  },
  todoText: { fontSize: 16 },
  emptyText: {
    fontSize: 30,
    color: "purple",
    textAlign: "center",
    marginTop: 50,
    marginBottom:20
  },
});
 
// import { View, Text } from "react-native";
// import { useEffect, useState } from "react";
// import { config, database } from "./appwriteConfig";

// export default function Index() {
//   const [tasks, setTasks] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     try {
//       const result = await database.listDocuments(config.db, config.col.todo);
//       setTasks(result.documents);
//     } catch (err) {
//       console.log("ERROR:", err);
//       setError(err.message);
//     }
//   };

//   return (
//     <View>
//       <Text>hello</Text>
//       {error && <Text style={{ color: "red" }}>Error: {error}</Text>}
//       {tasks.map((task) => (
//         <Text key={task.$id}>{task.title} , hey hey hey</Text>
//       ))}
//     </View>
//   );
// }
