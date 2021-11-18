import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DataContext } from './shared/utils/DataContext'
import { StorageAccessFramework } from 'expo-file-system'
import * as DocumentPicker from 'expo-document-picker'
import axios from 'axios'

const LogScreen = () => {
  const [locations, setData] = useContext(DataContext)
  const [serverUrl, onChangeText] = useState(null)
  const [file, setFile] = useState(null)

  const saveDocument = async () => {
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync()

    if (permissions.granted) {
      const dirUri = permissions.directoryUri
      const docUri = await StorageAccessFramework.createFileAsync(
        dirUri,
        'logs',
        'application/json'
      )
      const resp = await StorageAccessFramework.writeAsStringAsync(
        docUri,
        JSON.stringify(locations)
      )
    }
  }

  const openDocument = async () => {
    const file = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      multiple: false,
      type: 'application/json'
    })

    if (file.type != 'cancel') {
      setFile(file)
      const resp = await StorageAccessFramework.readAsStringAsync(file.uri)
      console.log(resp) // UPLOAD STRING TO SERVER!
    }

    // const permissions =
    //   await StorageAccessFramework.requestDirectoryPermissionsAsync()

    // if (permissions.granted) {
    //   const dirUri = permissions.directoryUri
    // }

    //await StorageAccessFramework.readAsStringAsync()
  }

  const uploadDocument = async () => {
    try {
      const response = await axios.post(serverUrl, {
        // INSERT FILE!
      })
      if (response.status === 201) {
        alert(` You have created: ${JSON.stringify(response.data)}`)
      } else {
        throw new Error('An error has occurred')
      }
    } catch (error) {
      alert('An error has occurred')
    }
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Logs</Text>
        <Button onPress={saveDocument} title="Save log" />
        <Button onPress={openDocument} title="Open log" />
        <Text>name: {file?.name}</Text>
        <Text>type: {file?.mimeType}</Text>
        <Text>size: {file?.size} bytes</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={serverUrl}
          placeholder="server address"
          keyboardType="default"
        />

        <Button onPress={uploadDocument} title="Upload log" />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
})

export default LogScreen
