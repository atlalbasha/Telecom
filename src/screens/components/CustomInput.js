import React from 'react'
import { StyleSheet, View, TextInput, Platform } from 'react-native'

const CustomInput = (props) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder="https://"
        keyboardType="default"
      />
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: '#3b4053',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#3b4053',
    borderWidth: 1,
    borderRadius: 8,
    color: 'white',
    marginBottom: 8
  }
})
