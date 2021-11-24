import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MultiSliderComponent from './components/MultiSliderComponent'
import { DataContext } from './shared/utils/DataContext'

import ButtonStyle from './components/ButtonStyle'

const SettingsScreen = ({ navigation }) => {
  const [darkGreenValues, setDarkGreenValues] = useState([90])
  const [lightGreenValues, setLightGreenValues] = useState([70])
  const [yellowValues, setYellowValues] = useState([50])
  const [orangeValues, setOrangeValues] = useState([30])
  const [redValues, setRedValues] = useState([15])
  const [greyValues, setGreyValues] = useState([5])

  const { colors } = useContext(DataContext)

  const [colorsValues, setColorsValues] = colors

  const setDarkGreen = (value) => {
    setDarkGreenValues(Number(value))
  }
  const setLightGreen = (value) => {
    setLightGreenValues(Number(value))
  }
  const setYellow = (value) => {
    setYellowValues(Number(value))
  }

  const setOrange = (value) => {
    setOrangeValues(Number(value))
  }
  const setRed = (value) => {
    setRedValues(Number(value))
  }
  const setGrey = (value) => {
    setGreyValues(Number(value))
  }
  const setColors = (value) => {
    const colors = [
      greyValues / 100,
      redValues / 100,
      orangeValues / 100,
      yellowValues / 100,
      lightGreenValues / 100,
      darkGreenValues / 100
    ]

    setColorsValues(colors)
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.textHeader}>Change colors</Text>
        <MultiSliderComponent
          label={'Dark Green'}
          value={darkGreenValues}
          onValuesChange={setDarkGreen}
          max={100}
          min={80}
        />
        <MultiSliderComponent
          label={'Light Green'}
          value={lightGreenValues}
          onValuesChange={setLightGreen}
          max={80}
          min={60}
        />
        <MultiSliderComponent
          label={'Yellow'}
          value={yellowValues}
          onValuesChange={setYellow}
          max={60}
          min={40}
        />
        <MultiSliderComponent
          label={'Orange'}
          value={orangeValues}
          onValuesChange={setOrange}
          max={40}
          min={20}
        />
        <MultiSliderComponent
          label={'Red '}
          value={redValues}
          onValuesChange={setRed}
          max={20}
          min={10}
        />
        <MultiSliderComponent
          label={'Grey'}
          value={greyValues}
          onValuesChange={setGrey}
          max={10}
          min={0}
        />

        <ButtonStyle canSend={true} title="Save" onPress={setColors} />

        <ButtonStyle
          title="Go Back"
          canSend={true}
          onPress={() => navigation.navigate('Map')}
        />
      </View>
    </SafeAreaView>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#252b41',
    height: '100%'
  },
  textHeader: {
    color: 'white',
    fontSize: 40,
    marginBottom: 20
  }
})
