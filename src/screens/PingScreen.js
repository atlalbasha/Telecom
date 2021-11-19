import React, { useContext, useEffect, useState } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'

//Det ska kunna göras 3st ping request en gång alternativt kontinuerligt med följande interval: ​
//50ms, 100ms, 200ms, 500ms, 1000ms

export default function PingScreen() {
  const [urlResult, setUrlResult] = useState([])
  const [text, onTextChange] = React.useState('')

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#14213d' }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white'
        }}
      >
        Ping Screen
      </Text>
      <Text style={styles.text}>URL Code: {urlResult}</Text>

      <TextInput
        style={styles.input}
        onChangeText={onTextChange}
        value={text}
        placeholder="Write a url to search"
        keyboardType="url"
      />
      <Pressable
        value={text}
        onPress={() => {
          getUrl(text)
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'lightgrey' : '#0077b6'
          },
          styles.viewButton
        ]}
      >
        <Text style={styles.buttonText}>Send new url</Text>
      </Pressable>
    </SafeAreaView>
  )

  function getUrl(url) {
    const searchApi = async () => {
      const response = await axios.get('https://' + url)
      setUrlResult(response.status)
      console.log('URL result ', urlResult)
    }
    searchApi()
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    top: Platform.OS === 'ios' ? 10 : 0
  },
  viewButton: {
    minHeight: 50,
    borderRadius: 15,
    margin: 2
  },
  item: {
    padding: 10,
    fontSize: 28,
    paddingTop: 10,
    paddingBottom: 10
  },
  text: {
    top: 10,
    color: 'white',
    backgroundColor: '#0000',
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    margin: 20,
    borderWidth: 2,
    padding: 20,
    color: 'white'
  }
})
