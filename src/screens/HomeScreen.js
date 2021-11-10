import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapScreen from './MapScreen'
import { SafeAreaView } from 'react-native-safe-area-context'
import netInfoApi from './shared/api/netinfo'
import * as Location from 'expo-location'
import NetInfo from '@react-native-community/netinfo'

const HomeScreen = ({ navigation }) => {
  const [netInfoData, setNetInfoData] = useState()

  const [location, setLocation] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(async () => {
    console.log(await netInfoApi())
    NetInfo.addEventListener((state) => {
      setNetInfoData(state)
    })

    let { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      setErrorMessage('Permission to access location was denied')
      return
    }
    await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.BestForNavigation },
      (value) => {
        setLocation(value)
      }
    )
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
