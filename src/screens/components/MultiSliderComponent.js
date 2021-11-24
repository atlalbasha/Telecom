import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import CustomMarker from './CustomMarker'

const MultiSliderComponent = (props) => {
  return (
    <View>
      <View style={styles.label}>
        <Text style={styles.labelColor}>{props.label}</Text>
        <Text style={styles.labelColor}>{props.value / 10}</Text>
      </View>

      <MultiSlider
        values={props.value}
        onValuesChange={props.onValuesChange}
        sliderLength={370}
        snapped
        min={props.min}
        max={props.max}
        step={1}
        selectedStyle={{
          backgroundColor: props.color
        }}
        unselectedStyle={{
          backgroundColor: 'silver'
        }}
        trackStyle={{
          height: 8,
          backgroundColor: 'red'
        }}
        customMarker={CustomMarker}
      />
    </View>
  )
}

export default MultiSliderComponent

const styles = StyleSheet.create({
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: '5%'
  },
  labelColor: {
    color: 'white'
  }
})
