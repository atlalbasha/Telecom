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

  const [text, onTextChange] = React.useState('')

  // Det ska kunna göras 3st ping request en gång alternativt kontinuerligt med följande interval: ​
  // 50ms, 100ms, 20ms, 500ms, 1000ms​
  // Lägga en if-sats och stoppa ifall number === tex 2000ms

  return (
    <SafeAreaView>
      <Text style={{ textAlign: 'center', fontSize: 20 }}>
        I'm the ping screen
      </Text>
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
      <FlatList data={result}>
        <View style={styles.item}>
          <Text style={styles.text}>Type: {result}</Text>
        </View>
      </FlatList>
      <FlatList
        data={result}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>Type: {item.category}</Text>
            <Text style={styles.text}>{item.setup}</Text>
            <Text style={styles.text}>{item.delivery}</Text>
          </View>
        )}
        keyExtractor={(joke) => joke.id.toString()}
      />
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
      // if (result) {
      //   const timer = count - now
      //   console.log('My timer: ', timer)
      // }
    }
    searchApi()
  }
  function getUrl(url) {
    const searchApi = async () => {
      const response = await axios.get(url)
      setResult(response.data.jokes)
      console.log(result)
      // if (result) {
      //   let timer = countDownDate - new Date().getTime
      //   console.log('My timer: ', timer)
      //   console.log(result)
      //   return result
      // }
    }
    searchApi()
  }
  function setTimer() {
    var count = new Date(countDownDate).getTime()
    var now = new Date().getTime()
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
