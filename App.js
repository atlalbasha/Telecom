import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HomeScreen from './src/screens/HomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MapScreen from './src/screens/MapScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {
  const Stack = createNativeStackNavigator()

  const Tab = createBottomTabNavigator()
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            options={{
              header: () => null
            }}
            name="Home"
            component={HomeScreen}
          />
          <Tab.Screen
            options={{
              header: () => null
            }}
            name="Map"
            component={MapScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({})
