import React, { useContext, useEffect, useState } from 'react'
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'

export default function PingScreen() {
  const [urlResult, setUrlResult] = useState([])
  const [text, onTextChange] = useState('')
  let [result] = useState([])
  let firstResult = useState([])
  let time = useState('')

  const [isStopwatchStart, setIsStopwatchStart] = useState(false)
  const [resetStopwatch, setResetStopwatch] = useState(false)
  const [totTime, setTotTime] = useState('')

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#252b41', height: '100%', padding: 16 }}>
        <View style={options.container}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white'
            }}
          >
            Timer for request
          </Text>
          <View>
            <Stopwatch
              laps
              msecs
              start={isStopwatchStart}
              reset={resetStopwatch}
              options={options}
              getTime={getFormattedTime}
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
        <FlatList
          data={result}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.listText}>
                Request: {item.text}, Time: {item.status} & status: {item.code}
              </Text>
            </View>
          )}
          keyExtractor={(text) => text.id}
        />
      </View>
    </SafeAreaView>
  )

  function getFormattedTime(time) {
    if (time !== '00:00:00:000') {
      setTotTime(time)
    }
  }

  function getUrl(url) {
    const searchApi = async () => {
      try {
        const response = await axios.get('http://' + url)
        setUrlResult(response.status)
        result.push({
          id: result.length,
          text: url,
          status: totTime,
          code: response.status
        })
        setIsStopwatchStart(false)
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Data fetching cancelled')
        } else {
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
  listText: {
    fontSize: 16,
    color: 'white'
  },
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
    marginLeft: 20
  }
})
