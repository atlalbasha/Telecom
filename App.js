import React from 'react'
import { StyleSheet } from 'react-native'
import HomeScreen from './src/screens/HomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MapScreen from './src/screens/MapScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { DataProvider } from './src/screens/shared/utils/DataContext'

export default function App() {
  const Stack = createNativeStackNavigator()

  const Tab = createBottomTabNavigator()
  return (
    <DataProvider>
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
    </DataProvider>
  )
}

const styles = StyleSheet.create({})
