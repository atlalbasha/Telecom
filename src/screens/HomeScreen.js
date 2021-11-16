import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapScreen from './MapScreen'
import { SafeAreaView } from 'react-native-safe-area-context'
import netInfoApi from './shared/api/netinfo'
import * as Location from 'expo-location'
import NetInfo from '@react-native-community/netinfo'

import { DataContext } from './shared/utils/DataContext'

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useContext(DataContext)
  const [netInfoData, setNetInfoData] = useState()
  const [location, setLocation] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      setErrorMessage('Permission to access location was denied')
      return
    }

    NetInfo.addEventListener((state) => {
      setNetInfoData(state)
    })

    let asyncLocation = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 1,
        timeInterval: 1000
      },
      (loc) => {
        setLocation(JSON.parse(JSON.stringify(loc.coords)))
        setData((prevLocation) => [
          ...prevLocation,
          {
            longitude: loc.coords.longitude,
            latitude: loc.coords.latitude,
            weight: 20
          }
        ])
      }
    )

    //const newLocation = await Location.getCurrentPositionAsync()
    //setLocation(JSON.stringify(newLocation))
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
