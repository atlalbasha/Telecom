import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Switch, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import NetInfo from '@react-native-community/netinfo'
import SignalInfo from './components/SignalInfo'
import NetworkInfo from './components/NetworkInfo'
import LocationInfo from './components/LocationInfo'
import { DataContext } from './shared/utils/DataContext'

const HomeScreen = () => {
  const { data } = useContext(DataContext)
  const [dataValues, setDataValues] = data
  const [randomNumber, setRandomNumber] = useState(0)

  const [client, setClient] = useState(null)
  const [netInfoData, setNetInfoData] = useState()
  const [location, setLocation] = useState(null)
  //SWITCH
  const [isEnabled, setIsEnabled] = useState(true)
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState)
  }

  const getRandomNumber = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1)
  }
  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      setErrorMessage('Permission to access location was denied')
      return
    }
  }
  const getNetInfo = async () => {
    NetInfo.addEventListener((state) => {
      setNetInfoData(state)
    })
  }
  const getLocation = async () => {
    const loc1 = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 1,
        timeInterval: 1000
      },
      (loc) => {
        setLocation(loc)
        getRandomNumber()
        setDataValues((prevLocation) => [
          ...prevLocation,
          {
            longitude: loc.coords.longitude,
            latitude: loc.coords.latitude,
            weight: randomNumber
          }
        ])
      }
    )

    setClient(loc1)
  }

  useEffect(() => {
    getPermissions()
    getNetInfo()
    if (isEnabled) {
      getLocation()
    } else {
      client.remove()
    }
  }, [isEnabled])

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.textHeader}>TeleCom</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#767577' }}
          thumbColor={isEnabled ? '#74A57F' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <SignalInfo
          isActive={isEnabled}
          strength={randomNumber}
          frequency={netInfoData?.details.frequency}
        />
        <NetworkInfo
          isActive={isEnabled}
          type={netInfoData?.type}
          isConnected={netInfoData?.isConnected.toString()}
          isInternetReachable={true} //netInfoData?.isInternetReachable.toString()}
          isWifiEnabled={true} //netInfoData?.isWifiEnabled.toString()}
          ssid={netInfoData?.details.ssid}
          ipAddress={netInfoData?.details.ipAddress}
          subnet={netInfoData?.details.subnet}
        />
        <LocationInfo
          isActive={isEnabled}
          latitude={location?.coords.latitude}
          longitude={location?.coords.longitude}
          accuracy={location?.coords.accuracy}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#252b41',
    height: '100%',
    padding: 16
  },
  textHeader: {
    color: 'white',
    fontSize: 40,
    marginBottom: 8
  }
})

export default HomeScreen
