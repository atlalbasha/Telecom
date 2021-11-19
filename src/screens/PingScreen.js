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

export default function PingScreen() {
  const [result, setResult] = useState([])
  const [urlResult, setUrlResult] = useState([])

  const [text, onTextChange] = React.useState('')

  const [counter, setCounter] = React.useState(300)
  // Klockar ner från 5min måste integrera med ping koden  50ms, 100ms, 20ms, 500ms, 1000ms​
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000)
    return () => clearInterval(timer)
  }, [counter])

  // Det ska kunna göras 3st ping request en gång alternativt kontinuerligt med följande interval: ​
  // 50ms, 100ms, 20ms, 500ms, 1000ms​
  // Lägga en if-sats och stoppa ifall number === tex 2000ms

  return (
    <SafeAreaView>
      <Text style={{ textAlign: 'center', fontSize: 20 }}>
        I'm the ping screen
      </Text>
      <Text>Countdown: {counter}</Text>
      <Text style={styles.text}>Ping: {result}</Text>
      <Text style={styles.text}>URL: {urlResult}</Text>
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
      <Pressable
        onPress={() => {
          getPing()
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'lightgrey' : '#0077b6'
          },
          styles.viewButton
        ]}
      >
        <Text style={styles.buttonText}>Ping some info</Text>
      </Pressable>
    </SafeAreaView>
  )

  function getPing() {
    const searchApi = async () => {
      const response = await axios.get('https://www.google.se/')
      setResult(response.status)
      console.log(result)
    }
    searchApi()
  }
  function getUrl(url) {
    const searchApi = async () => {
      const response = await axios.get(url)
      setUrlResult(response.status)
      console.log('URL resulr ', urlResult)
    }
    searchApi()
  }
}

const styles = StyleSheet.create({
  viewBackground: {
    maxHeight: 50,
    backgroundColor: '#F8F9FA'
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    top: 10
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
    backgroundColor: '#0000',
    fontSize: 15,
    textAlign: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
})
