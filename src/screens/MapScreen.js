import * as React from 'react'
import MapView, { Callout, Heatmap } from 'react-native-maps'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import { DataContext } from './shared/utils/DataContext'

import { useContext } from 'react'
export default function App() {
  const [data, setData] = useContext(DataContext)

  console.log(data)
  const areaColors = ['green', 'yellow', 'orange']
  const startPoints = [0.01, 0.5, 0.75]

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 57.70887,
          longitude: 11.97456,
          latitudeDelta: 0.75,
          longitudeDelta: 0.75
        }}
      >
        <Heatmap
          points={data}
          radius={10}
          gradient={{ colors: areaColors, startPoints }}
        />
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
