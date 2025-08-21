import { View, Text } from 'react-native'
import { createHomeStyles } from '@/assets/styles/home.styles';
import UseTheme from '@/hooks/UseTheme';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
  const { colors } = UseTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  const completeCount = todos?.filter(todo => todo.isComplete).length || 0;
  const totalCount = todos?.length || 0;
  const progress = totalCount > 0 ? (completeCount/totalCount)*100 : 0;
  return (
    <View style={homeStyles.header}>
      <View style={homeStyles.titleContainer}>
        <LinearGradient colors={colors.gradients.primary} style={homeStyles.iconContainer}>
          <Ionicons name='flash-outline' size={28} color="#fff" />
        </LinearGradient>
        <View style={homeStyles.titleTextContainer}>
          <Text style={homeStyles.title}>Today&apos;s Tasks 👀</Text>
          <Text style={homeStyles.subtitle}>{completeCount} of {totalCount} completed</Text>
        </View>
      </View>
        <View style={homeStyles.progressContainer}>
          <View style={homeStyles.progressBarContainer}>
           <View style={homeStyles.progressBar}>
            <LinearGradient 
             colors={colors.gradients.success}
              style={[homeStyles.progressFill, { width: `${progress}%` }]}/>
           </View>
           <Text style={homeStyles.progressText}>{Math.round(progress)}%</Text>
          </View>
        </View>
    </View>
  )
}

export default Header