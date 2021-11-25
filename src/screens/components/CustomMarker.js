import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'

class CustomMarker extends React.Component {
  render() {
    return (
      <View
        style={{
          borderRadius:
            Math.round(
              Dimensions.get('window').width + Dimensions.get('window').height
            ) / 2,
          width: 16,
          height: 16,
          backgroundColor: '#ffff',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      ></View>
    )
  }
}

const styles = StyleSheet.create({})

export default CustomMarker
