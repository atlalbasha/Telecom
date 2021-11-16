import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DataContext } from './shared/utils/DataContext'

const MapScreen = () => {
  const [data, setData] = useContext(DataContext)
  console.log(data)
  return (
    <SafeAreaView>
      <View>
        <Text>Map Screen</Text>
        {/* <Text>{data?.coords.latitude}</Text> */}
      </View>
    </SafeAreaView>
  )
}

export default MapScreen

const styles = StyleSheet.create({})
