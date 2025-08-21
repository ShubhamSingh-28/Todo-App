import { View, Text, SafeAreaView, ScrollView } from 'react-native'

import UseTheme from '@/hooks/UseTheme'
import { createSettingsStyles } from '@/assets/styles/settings.styles'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import ProgressState from '@/components/ProgressState'
import Prefrence from '@/components/Prefrence'
import DangerZone from '@/components/DangerZone'

const Settings = () => {
  
  const { colors} = UseTheme();
  const SettingStyles= createSettingsStyles(colors)
  return (
    <LinearGradient colors={colors.gradients.background} style={SettingStyles.container}>
      <SafeAreaView style={SettingStyles.safeArea}>
        <View style={SettingStyles.header}>
          <View style={SettingStyles.titleContainer}>
          <LinearGradient colors={colors.gradients.primary} style={SettingStyles.iconContainer}>
            <Ionicons name="settings" size={24} color="#fff" />
          </LinearGradient>
            <Text style={SettingStyles.title}>Settings</Text>
          </View>
        </View>
        <ScrollView style={SettingStyles.scrollView}
         contentContainerStyle={SettingStyles.content}
         showsVerticalScrollIndicator={false}
         >
          <ProgressState/>
          <Prefrence/>
          <DangerZone/>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default Settings