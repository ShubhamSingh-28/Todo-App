import { View, Text,ActivityIndicator } from 'react-native'
import React from 'react'
import UseTheme from '@/hooks/UseTheme'
import { createHomeStyles } from '@/assets/styles/home.styles';
import { LinearGradient } from 'expo-linear-gradient';

const Loading = () => {
    const {colors} = UseTheme();
    const homeStyles = createHomeStyles(colors);
  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
        <View style={homeStyles.loadingContainer} >
            <ActivityIndicator size="large" color={colors.primary} />
             <Text style={homeStyles.loadingText}>Loading Your Todos...</Text>
        </View>
    </LinearGradient>
  )
}

export default Loading