import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapScreen from './MapScreen'
import { SafeAreaView } from 'react-native-safe-area-context'
import netInfoApi from './shared/api/netinfo'
import * as Location from 'expo-location'
import NetInfo from '@react-native-community/netinfo'
import { DataProvider } from './shared/utils/DataContext'
import { DataContext } from './shared/utils/DataContext'

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useContext(DataContext)
  const [netInfoData, setNetInfoData] = useState()
  const [location, setLocation] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(async () => {
    NetInfo.addEventListener((state) => {
      setNetInfoData(state)
    })

    let { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      setErrorMessage('Permission to access location was denied')
      return
    }
    const newLocation = await Location.getCurrentPositionAsync()
    setLocation(newLocation)

    if (location.coords.latitude !== location.coords.latitude) {
      setData((data) => [...data, location])
    }
  }, [])

  let text = 'Waiting...'
  if (errorMessage) {
    text = errorMessage
  } else if (location) {
    text = JSON.stringify(location)
  }

  const showData = () => {
    if (netInfoData) {
      return (
        <View>
          <Text>typeof: {netInfoData.type}</Text>
          <Text>isConnected: {netInfoData.isConnected.toString()}</Text>
          <Text>{netInfoData.details.strength}</Text>
        </View>
      )
    }
  }

  return (
    <SafeAreaView>
      <View>
        {showData()}
        <Text>{text}</Text>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({})

export default HomeScreen
