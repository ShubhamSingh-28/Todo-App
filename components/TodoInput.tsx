import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { createHomeStyles } from '@/assets/styles/home.styles';
import UseTheme from '@/hooks/UseTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

const TodoInput = () => {
    const [newTodo, setNewTodo] = useState("");
    const { colors } = UseTheme();
    const homeStyles = createHomeStyles(colors);
    const addTodo = useMutation(api.todos.addTodo);
    const handleAddTodo = async () => {
        if (newTodo.trim()){
            try {
                await addTodo({ text: newTodo.trim()});
                setNewTodo("");
            } catch (error) {
                Alert.alert("Error", "Failed to add todo. Please try again.");
            }
        }
    }
  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <TextInput
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          placeholderTextColor={colors.textMuted}
          placeholder="Add a new task"
          style={homeStyles.input}
        />
        <TouchableOpacity onPress={handleAddTodo} activeOpacity={0.8} disabled={!newTodo.trim()}>
          <LinearGradient
            colors={newTodo.trim() ? colors.gradients.primary : colors.gradients.muted}
            style={[homeStyles.addButton, !newTodo.trim() && homeStyles.addButtonDisabled]}
          >
            <Ionicons name="add" size={24} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TodoInput