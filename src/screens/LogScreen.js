import React, { useContext, useState, useCallback } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import getCurrentTime from "./shared/utils/currentTime";
import CustomAlert from "./components/CustomAlert";
import ListItem from "./components/ListItem";

const LogScreen = () => {
  const [locations, setData] = useContext(DataContext);
  const [serverUrl, onChangeText] = useState(null);
  const [userDirectory, setUserDirectory] = useState(null);
  const [filesUri, setFilesUri] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [uriToDelete, setUriToDelete] = useState(null);

  const getAllDocument = async () => {
    const tmp = [];
    const files = await StorageAccessFramework.readDirectoryAsync(
      userDirectory
    );
    const filtered = files.filter((uri) => uri.includes("telecom-logs-"));
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

  const deleteDocument = async () => {
    await StorageAccessFramework.deleteAsync(uriToDelete);
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

  const renderItem = ({ item }) => (
    <ListItem
      uri={item.uri}
      filename={item.filename}
      size={item.size}
      type={item.type}
      isSelected={item.isSelected}
      onDelete={() => {
        setUriToDelete(item.uri);
        setShowAlert(true);
      }}
      onClick={() => {
        console.log("item clicked");
      }}
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

        {/* CUSTOM ALERT */}
        <CustomAlert
          isShowing={showAlert}
          title={"Delete File"}
          message={"Are you sure you want to delete this file?"}
          onCancel={() => {
            setShowAlert(false);
          }}
          onConfirm={() => {
            deleteDocument();
            setShowAlert(false);
          }}
        />
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
