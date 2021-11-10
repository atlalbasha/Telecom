import { SafeAreaView } from 'react-native-safe-area-context'
import * as React from 'react'
import MapView, { Callout, Marker } from 'react-native-maps'
import { StyleSheet, View, Dimensions, Text } from 'react-native'

const MapScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 57.70887,
            longitude: 11.97456,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <Marker
            coordinate={{
              latitude: 57.70887,
              longitude: 11.97456
            }}
          >
            <Callout>
              <Text>Gothenburg</Text>
            </Callout>
          </Marker>
        </MapView>
      </View>
    </SafeAreaView>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
})
