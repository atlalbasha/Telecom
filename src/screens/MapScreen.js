import * as React from 'react'
import MapView, { Callout, Heatmap, Marker } from 'react-native-maps'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function App() {
  const area = [
    { latitude: 57.70887, longitude: 11.97456, weight: 2 },
    { latitude: 58.283489, longitude: 12.285821, weight: 2 }
  ]
  const areaColors = ['blue', 'red', 'orange']
  const startPoints = [0.01, 0.5, 0.75]
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 57.70887,
          longitude: 11.97456,
          latitudeDelta: 0.05,
          longitudeDelta: 0.01
        }}
      >
        <Heatmap
          points={area}
          radius={20}
          gradient={{ colors: areaColors, startPoints }}
        />
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
})
