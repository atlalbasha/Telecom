import React from 'react'
import { Button } from 'react-native-paper'
import { StyleSheet, Text, View } from 'react-native'

const ButtonStyle = (props) => {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        color="#74A57F"
        dark={true}
        onPress={props.onPress}
      >
        {props.title}
      </Button>
    </View>
  )
}

export default ButtonStyle

const styles = StyleSheet.create({
  container: { marginBottom: 20 }
})
