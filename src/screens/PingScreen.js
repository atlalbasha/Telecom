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

import ButtonStyle from './components/ButtonStyle'
import CustomInput from './components/CustomInput'

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#252b41' }}>
      <View style={styles.container}>
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
            />
          </View>
        </View>

        <Text style={styles.text}>Code: {urlResult}</Text>
        <CustomInput onChangeText={onTextChange} value={text} />

        <ButtonStyle
          canSend={true}
          onPress={() => {
            getUrl(text)
            setIsStopwatchStart(!isStopwatchStart)
            setResetStopwatch(false)
          }}
          title="Search"
        />
        <ButtonStyle
          canSend={true}
          onPress={() => {
            setResetStopwatch(!resetStopwatch)
          }}
          title="Reset"
        />

        <FlatList
          data={result}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.listText}>Type: {item.status}</Text>
            </View>
          )}
          keyExtractor={(joke) => joke.id}
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
  container: { padding: 16 },
  listText: {
    fontSize: 16,
    color: 'white'
  },

  item: {
    padding: 10,
    fontSize: 28,
    paddingTop: 10,
    paddingBottom: 10
  },
  text: {
    marginBottom: 16,
    top: 10,
    color: 'white',
    backgroundColor: '#0000',
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

const options = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: '#0000',
    padding: 8,
    borderRadius: 5,
    width: 200
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 20
  }
})
