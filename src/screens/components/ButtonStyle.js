import React from 'react'

import { StyleSheet, Text, View, Pressable } from 'react-native'

const ButtonStyle = (props) => {
  return (
    <View style={styles.container}>
      <Pressable
        disabled={!props.canSend}
        style={props.canSend ? styles.button : styles.buttonDisabled}
        onPress={props.onPress}
      >
        <Text
          style={props.canSend ? styles.buttonText : styles.buttonTextDisabled}
        >
          {props.title}
        </Text>
      </Pressable>
    </View>
  )
}

export default ButtonStyle

const styles = StyleSheet.create({
  container: { marginBottom: 8 },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 0,
    backgroundColor: '#0496FF'
  },
  buttonDisabled: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 0,
    backgroundColor: '#3B4053'
  },
  buttonText: {
    color: 'white'
  },
  buttonTextDisabled: {
    color: 'grey'
  }
})
