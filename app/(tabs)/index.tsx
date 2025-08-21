
import { createHomeStyles } from "@/assets/styles/home.styles";
import   UseTheme,{ColorScheme } from "@/hooks/UseTheme";
import { Alert, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Loading from "@/components/Loading";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import EmptyState from "@/components/EmptyState";
import { useState } from "react";

type Todo = Doc<"todos">;

export default function Index() {
  const { colors } = UseTheme();
  const styles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo)
  const isLoading = todos === undefined;
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);
  const [editId, setEditId] = useState<Id<"todos">| null>(null);
  const [editText, setEditText] = useState("");
  
  const handleDeleteTodo = async(id: Id<"todos">) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?",[
      {text:"Cancel",style:"cancel"},
      {text:"Delete",style:"destructive",onPress:()=> deleteTodo({id})}
    ])
  };

   const handleEditTodo= (todo:Todo)=>{
    setEditId(todo._id);
    setEditText(todo.text);
   }
   const handleSaveEdit= async()=>{
    if(editId && editText) {
      try {
        await updateTodo({id: editId, text: editText});
         handleCancelEdit();
      } catch (error) {
        Alert.alert("Error", "Failed to update todo");
      }
    }
   }
   const handleCancelEdit= ()=>{
     setEditId(null);
     setEditText("");
   }
  // const handleEditTodo = async(id: Id<"todos">) => {
  //   try {
  //     await addTodo({id},{text: "Updated Todo"});
  //   } catch (error) {
  //     Alert.alert("Error", "Failed to add todo");
  //   }
  // };

  const handleToggleTodo = async(id: Id<"todos">) => {
    try {
      await toggleTodo({id});
    } catch (error) {
      Alert.alert("Error", "Failed to toggle todo");
    }
  };

  if(isLoading) return <Loading />;

  const renderItems = ({ item }: { item: Todo }) => {
     const isEditing = editId === item._id;
    return(
      <View key={item._id} style={styles.todoItemWrapper}>
        <LinearGradient colors={colors.gradients.surface} style={styles.todoItem} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <TouchableOpacity style={styles.checkbox} activeOpacity={0.7} onPress={() => handleToggleTodo(item._id)}>
            <LinearGradient colors={item.isComplete ?colors.gradients.success:colors.gradients.muted}
            style={[styles.checkboxInner,{borderColor: item.isComplete ? "transparent" : colors.border}]}
            >
              {item.isComplete && <Ionicons name="checkmark" size={18} color="#fff" />}
            </LinearGradient>
          </TouchableOpacity>
          {isEditing ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.editInput}
                value={editText}
                onChangeText={setEditText}
                autoFocus
                multiline
                placeholder="Edit todo"
                placeholderTextColor={colors.textMuted}
              />
              <View style={styles.editButtons}>
                <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.success} style={styles.editButton}>
                    <Ionicons name="checkmark" size={16} color="#fff" />
                    <Text style={styles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.muted} style={styles.editButton}>
                    <Ionicons name="close" size={16} color="#fff" />
                    <Text style={styles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ):(
          <View style={styles.todoTextContainer}>
            <Text style={[styles.todoText, item.isComplete && { textDecorationLine: "line-through", color: colors.textMuted,opacity:0.6}]}>{item.text}</Text>
            <View style={styles.todoActions}>
              <TouchableOpacity activeOpacity={0.8}  onPress={() => handleEditTodo(item)}>
                <LinearGradient colors={colors.gradients.warning} style={styles.actionButton}>
                  <Ionicons name="pencil" size={14} color="#fff"/>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}  onPress={() => handleDeleteTodo(item._id)}>
                <LinearGradient colors={colors.gradients.danger} style={styles.actionButton}>
                  <Ionicons name="trash" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
        </LinearGradient>
      </View>
    )
  }
  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={styles.safeArea}>
        <Header/>
        <TodoInput/>

        <FlatList
          data={todos}
          renderItem={renderItems}
          keyExtractor={item => item._id}
          style={styles.todoList}
          contentContainerStyle={styles.todoListContent}
          ListEmptyComponent={<EmptyState/>}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

