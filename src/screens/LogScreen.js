import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DataContext } from "./shared/utils/DataContext";
import { StorageAccessFramework } from "expo-file-system";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const LogScreen = () => {
  const [locations, setData] = useContext(DataContext);
  const [serverUrl, onChangeText] = useState(null);
  const [userDirectory, setUserDirectory] = useState(null);
  const [filesUri, setFilesUri] = useState([]);

  function getCurrentTime() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    return (
      date + "-" + month + "-" + year + "-" + hours + "-" + min + "-" + sec
    );
  }

  const getAllDocument = async () => {
    const tmp = [];
    const files = await StorageAccessFramework.readDirectoryAsync(
      userDirectory
    );

    console.log(files.length);
    const filtered = files.filter((uri) => uri.includes("telecom-logs-"));
    console.log(filtered);
    filtered.forEach(async (element) => {
      const resp = await FileSystem.getInfoAsync(element);
      if (resp.exists) {
        // TRIM THE NAME
        let index = resp.uri.indexOf("telecom");
        let name = resp.uri.slice(index);

        //CHECK AMOUT OF LOCATIONS - TODO

        tmp.push({
          uri: resp.uri,
          size: resp.size,
          type: "json",
          filename: name,
          isSelected: false,
        });
      }
      setFilesUri(tmp);
    });
    if (tmp.length === 0) {
      setFilesUri([]);
    }
  };

  const deleteDocument = async (uri) => {
    console.log(uri);
    await StorageAccessFramework.deleteAsync(uri);
    console.log("file deleted");
    getAllDocument();
  };

  const createUserDocument = async () => {
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (permissions.granted) {
      const dirUri = permissions.directoryUri;
      setUserDirectory(dirUri);
      const docUri = await StorageAccessFramework.createFileAsync(
        dirUri,
        "telecom-logs-" + getCurrentTime(),
        "application/json"
      );
      await StorageAccessFramework.writeAsStringAsync(
        docUri,
        JSON.stringify(locations)
      );
      getAllDocument();
    }
  };

  const openDocument = async () => {
    const file = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      multiple: false,
      type: "application/json",
    });

    if (file.type != "cancel") {
      setSingleFile(file);
      const resp = await StorageAccessFramework.readAsStringAsync(file.uri);
      console.log(resp); // UPLOAD STRING TO SERVER!
    }

    // const permissions =
    //   await StorageAccessFramework.requestDirectoryPermissionsAsync()

    // if (permissions.granted) {
    //   const dirUri = permissions.directoryUri
    // }

    //await StorageAccessFramework.readAsStringAsync()
  };

  const uploadDocument = async () => {
    try {
      const response = await axios.post(serverUrl, {
        // INSERT FILE!
      });
      if (response.status === 201) {
        alert(` You have created: ${JSON.stringify(response.data)}`);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert("An error has occurred");
    }
  };

  const Item = ({ uri, filename, size, type, isSelected }) => (
    <TouchableOpacity
      onPress={() => {
        console.log(isSelected);
      }}
    >
      <View style={styles.row}>
        <View>
          <Ionicons name="document-text-outline" size={32} color="white" />
        </View>
        <View style={styles.column}>
          <Text style={styles.whiteText}>{filename}</Text>
          <Text style={styles.whiteText}>{size} bytes</Text>
          <Text style={styles.whiteText}>{isSelected.toString()}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              deleteDocument(uri);
            }}
          >
            <Ionicons name="close-outline" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item
      uri={item.uri}
      filename={item.filename}
      size={item.size}
      type={item.type}
      isSelected={item.isSelected}
    />
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Logs</Text>
        <Button onPress={createUserDocument} title="Generate log file" />
        <Button onPress={getAllDocument} title="Refresh" />

        <FlatList
          data={filesUri}
          renderItem={renderItem}
          keyExtractor={(item) => item.uri}
        />

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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#252b41",
    height: "100%",
    padding: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#3b4053",
    borderRadius: 8,
  },
  column: {
    flexDirection: "column",
  },
  whiteText: {
    color: "white",
  },
});

export default LogScreen;
