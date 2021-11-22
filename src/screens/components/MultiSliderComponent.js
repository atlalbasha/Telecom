import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

const MultiSliderComponent = (props) => {
  return (
    <View>
      <View style={styles.label}>
        <Text>{props.label}</Text>
        <Text>{props.value / 10}</Text>
      </View>

      <MultiSlider
        values={props.value}
        onValuesChange={props.onValuesChange}
        sliderLength={370}
        snapped
        min={props.min}
        max={props.max}
        step={1}
      />
    </View>
  )
}

export default MultiSliderComponent

const styles = StyleSheet.create({
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: '5%',
    marginBottom: -10
  }
})
