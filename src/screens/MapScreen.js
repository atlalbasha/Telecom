import * as React from 'react'
import { useState } from 'react'
import MapView, { Heatmap, PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, View, Dimensions } from 'react-native'
import { mapStyle } from './Data.js/MapStyle1'
import { silverTheme } from './Data.js/MapStyle2'
import { Appbar } from 'react-native-paper'
import { DataContext } from './shared/utils/DataContext'

import { useContext } from 'react'
export default function App() {
  const [customMapStyle, setCustomMapStyle] = useState([])
  const [data, setData] = useContext(DataContext)

  console.log(data)
  const areaColors = ['green', 'orange', 'red']

  const startPoints = [0.01, 0.5, 0.75]
  const changeTheme = () => {
    setCustomMapStyle(mapStyle)
  }
  const changeThemeSilver = () => {
    setCustomMapStyle(silverTheme)
  }

  return (
    <View>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="MapView" />
        <Appbar.Action icon="map" onPress={changeTheme} />
        <Appbar.Action icon="map" onPress={changeThemeSilver} />
      </Appbar.Header>
      <MapView
        style={{ flex: 1 }}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={customMapStyle}
        initialRegion={{
          latitude: 57.70887,
          longitude: 11.97456,
          latitudeDelta: 0.05,
          longitudeDelta: 0.01
        }}
      >
        <Heatmap
          points={data}
          opacity={1}
          radius={20}
          maxIntensity={100}
          gradientSmoothing={10}
          heatmapMode={'POINTS_DENSITY'}
          gradient={{ colors: areaColors, startPoints }}
        ></Heatmap>
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'teal'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
})
