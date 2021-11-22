import React, { useContext, useEffect, useState } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'

//Det ska kunna göras 3st ping request en gång
export default function PingScreen() {
  const [urlResult, setUrlResult] = useState([])
  const [text, onTextChange] = useState('')

  //Timer
  const [isStopwatchStart, setIsStopwatchStart] = useState(false)
  const [resetStopwatch, setResetStopwatch] = useState(false)

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
      <View style={options.container}>
        <View style={options.sectionStyle}>
          <Stopwatch
            laps
            msecs
            start={isStopwatchStart}
            //To start
            reset={resetStopwatch}
            //To reset
            options={options}
            //options for the styling
            getTime={(time) => {
              getUrl()
              console.log(time)
            }}
          />
        </View>
      </View>
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
          setIsStopwatchStart(!isStopwatchStart)
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
    // start a timer in button press
    const searchApi = async () => {
      const response = await axios.get('https://' + url)
      setUrlResult(response.status)
      // end timer when request finished
      if (urlResult === '200') {
        setIsStopwatchStart(!isStopwatchStart)
        setResetStopwatch(true)
      }
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

const options = {
  container: {
    alignSelf: 'center',
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    width: 200
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7
  }
}
