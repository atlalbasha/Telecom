import React, { useContext, useEffect, useState } from 'react'
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import { Stopwatch } from 'react-native-stopwatch-timer'

// TO:DO PINGA 3ST GÅNGER -- Kolla om så som den gör nu ör okej
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
          fontSize: 34,
          fontWeight: 'bold',
          color: 'white'
        }}
      >
        Ping Screen
      </Text>
      <View style={options.container}>
        <View>
          <Stopwatch
            laps
            msecs
            start={isStopwatchStart}
            reset={resetStopwatch}
            options={options}
            getTime={(time) => {
              // Kolla om vi ska spara eller bara displaya tid
              console.log(time)
            }}
          />
        </View>
      </View>
      <Text style={styles.text}>Code: {urlResult}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onTextChange}
        value={text}
        placeholder="Search url for ping"
        placeholderTextColor="#fff"
        // eller default till android
        keyboardType={Platform.OS === 'ios' ? 'url' : 'email-address'}
      />
      <Pressable
        onPress={() => {
          getUrl(text)
          setIsStopwatchStart(!isStopwatchStart)
          setResetStopwatch(false)
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'lightgrey' : '#0077b6'
          },
          styles.viewButton
        ]}
      >
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setResetStopwatch(!resetStopwatch)
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'lightgrey' : '#0077b6'
          },
          styles.viewButton
        ]}
      >
        <Text style={styles.buttonText}>RESET</Text>
      </Pressable>
    </SafeAreaView>
  )

  function getUrl(url) {
    const searchApi = async () => {
      try {
        const response = await axios.get('http://' + url)
        setUrlResult(response.status)
        // end timer when request finished
        setIsStopwatchStart(false)
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Data fetching cancelled')
        } else {
          // Handle error
          alert('You need to write a full url')
          setUrlResult(error.toString())
          setResetStopwatch(false)
          setIsStopwatchStart(false)
        }
      }
    }
    searchApi()
    searchApi()
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
    color: '#ffff'
  }
})

const options = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: '#0000',
    padding: 5,
    borderRadius: 5,
    width: 200
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7
  }
})