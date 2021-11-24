import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import { Stopwatch } from 'react-native-stopwatch-timer'

import ButtonStyle from './components/ButtonStyle'
import CustomInput from './components/CustomInput'

export default function PingScreen() {
  const [urlResult, setUrlResult] = useState([])
  const [text, onTextChange] = useState('')
  let [result] = useState([])

  const [isStopwatchStart, setIsStopwatchStart] = useState(false)
  const [resetStopwatch, setResetStopwatch] = useState(false)

  return (
    <SafeAreaView>
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
              <Text style={styles.listText}>
                URL: {item.text} & code:{item.code}
              </Text>
            </View>
          )}
          keyExtractor={(joke) => joke.id}
        />
      </View>
    </SafeAreaView>
  )

  function getUrl(url) {
    const searchApi = async () => {
      try {
        const response = await axios.get('http://' + url)
        setUrlResult(response.status)
        setIsStopwatchStart(false)
        result.push({
          id: result.length,
          text: url,
          code: response.status
        })
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Data fetching cancelled')
        } else {
          result.push({
            id: result.length,
            text: url,
            code: error.toString()
          })
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
  container: {
    height: '100%',
    padding: 16,
    backgroundColor: '#252b41'
  },
  listText: {
    fontSize: 16,
    color: 'white'
  },
  item: {
    flex: 1,
    padding: 10
  },
  text: {
    marginBottom: 10,
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
