import { View, Text, Settings } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import {Ionicons} from '@expo/vector-icons'
import UseTheme from '@/hooks/UseTheme'

export default function TabsLayout() {
  const { colors } = UseTheme();
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle:{
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: 90,
            paddingBottom: 30,
            paddingTop: 10,
        },
        tabBarLabelStyle:{
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
    }}>
      <Tabs.Screen name="index" options={{title:"Todos",tabBarIcon: ({color,size})=><Ionicons name="flash-outline" color={color} size={size} />}}/>
      <Tabs.Screen name="settings" options={{title:"Settings",tabBarIcon: ({color,size})=><Ionicons name="settings" color={color} size={size} />}}/>
    </Tabs>
  )
}