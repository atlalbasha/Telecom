import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import { Stopwatch } from 'react-native-stopwatch-timer'

import ButtonStyle from './components/ButtonStyle'
import CustomInput from './components/CustomInput'
import CustomAlert from './components/CustomAlert'

export default function PingScreen() {
  const [urlResult, setUrlResult] = useState([])
  const [text, onTextChange] = useState('')
  const [totTime, setTime] = useState('')
  const [myAlert, setMyAlert] = useState(false)
  let [result] = useState([])

  const [isStopwatchStart, setIsStopwatchStart] = useState(false)
  const [resetStopwatch, setResetStopwatch] = useState(false)

  function getFormattedTime(time) {
    if (time.toString() !== '00:00:00:000') {
      setTime(time.toString())
      return totTime
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={options.container}>
          <Text
            style={{
              textAlign: 'center',
              fontStyle: 'italic',
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white'
            }}
          >
            Timer
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
            <ButtonStyle
              canSend={true}
              onPress={() => {
                setResetStopwatch(!resetStopwatch)
              }}
              title="Reset"
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
            result.push({
              id: result.length,
              text: text,
              code: urlResult,
              time: totTime
            })
          }}
          title="Add time to list"
        />
        <FlatList
          data={result}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text
                style={{ textAlign: 'center', fontSize: 20, color: '#ffff' }}
              >
                Time: {item.time}
              </Text>
              <Text style={styles.listText}>
                Search: {item.text} & Code: {item.code}
              </Text>
            </View>
          )}
          keyExtractor={(joke) => joke.id}
        />

        <CustomAlert
          isShowing={myAlert}
          title={'ERROR'}
          message={
            'Something went wrong! Check the call, example: Google.com..'
          }
          confirmText={'Okey'}
          confirmButtonColor={'#DD6B55'}
          showCancelButton={false}
          onConfirm={() => {
            setMyAlert(false)
          }}
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
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Data fetching cancelled')
        } else {
          setMyAlert(true)
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
    textAlign: 'center',
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
