import React from 'react'
import HomeScreen from './src/screens/HomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import MapScreen from './src/screens/MapScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import PingScreen from './src/screens/PingScreen'
import { Ionicons } from '@expo/vector-icons'
import { DataProvider } from './src/screens/shared/utils/DataContext'
import LogScreen from './src/screens/LogScreen'
import SettingsScreen from './src/screens/SettingsScreen'

export default function App() {
  const Tab = createBottomTabNavigator()

  return (
    <DataProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName
                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline'
                } else if (route.name === 'Map') {
                  iconName = focused ? 'map' : 'map-outline'

                } else if (route.name === 'Settings') {
                  iconName = focused ? 'settings' : 'settings-outline'
                }

                } else if (route.name === 'Log') {
                  iconName = focused ? 'documents' : 'documents-outline'
                } else if (route.name === 'Ping') {
                  iconName = focused ? 'wifi' : 'wifi-outline'
                }  

                return <Ionicons name={iconName} size={size} color={color} />
              },
              tabBarActiveTintColor: '#3b4053',
              tabBarInactiveTintColor: 'gray'
            })}
          >
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
            <Tab.Screen
              options={{
                header: () => null
              }}

              name="Settings"
              component={SettingsScreen}
            />

              name="Log"
              component={LogScreen}
            />
           <Tab.Screen
            options={{
              header: () => null
            }}
            name="Ping"
            component={PingScreen}
          />

          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </DataProvider>
  )
}
