import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DataContext } from "./shared/utils/DataContext";
import { StorageAccessFramework } from "expo-file-system";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import getCurrentTime from "./shared/utils/currentTime";
import CustomAlert from "./components/CustomAlert";
import ListItem from "./components/ListItem";

const LogScreen = () => {
  const [locations, setData] = useContext(DataContext);
  const [serverUrl, onChangeText] = useState("");
  const [userDirectory, setUserDirectory] = useState(null);
  const [filesUri, setFilesUri] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [uriToDelete, setUriToDelete] = useState(null);
  const [canSend, setCanSend] = useState(false);
  const [currentSelectedUri, setCurrentSelectedUri] = useState([]);

  useEffect(() => {
    if (serverUrl.length === 0) {
      setCanSend(false);
    } else {
      setCanSend(true);
    }
  }, [serverUrl]);

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

  async function uriToBody() {
    console.log("URI TO BODY");
    const files = currentSelectedUri.map(async (file, index) => {
      const content = await StorageAccessFramework.readAsStringAsync(file);
      return { id: index, locations: content };
    });
    const items = await Promise.all(files);
    return items;
  }

  const uploadDocument = async () => {
    setShowSuccessAlert(true);
    const body = await uriToBody();
    // try {
    //   const response = await axios.post(serverUrl, {
    //     // INSERT FILE!
    //   });
    //   if (response.status === 201) {
    //     alert(` You have created: ${JSON.stringify(response.data)}`);
    //   } else {
    //     throw new Error("An error has occurred");
    //   }
    // } catch (error) {
    //   alert("An error has occurred");
    // }
  };

  const renderItem = ({ item }) => (
    <ListItem
      uri={item.uri}
      filename={item.filename}
      size={item.size}
      type={item.type}
      onDelete={() => {
        setUriToDelete(item.uri);
        setShowDeleteAlert(true);
      }}
      onClick={(uri) => {
        const tmp = [...currentSelectedUri];
        if (tmp.length <= 0) {
          tmp.push(uri);
          setCurrentSelectedUri(tmp);
        } else {
          const index = tmp.findIndex((element) => element === uri);
          if (index === -1) {
            tmp.push(uri);
            setCurrentSelectedUri(tmp);
          } else {
            tmp.splice(index, 1);
            setCurrentSelectedUri(tmp);
          }
        }
      }}
    />
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Logs</Text>

        <Pressable style={styles.button} onPress={createUserDocument}>
          <Text style={styles.buttonText}>Generate new log file</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={getAllDocument}>
          <Text style={styles.buttonText}>Refresh</Text>
        </Pressable>

        <FlatList
          data={filesUri}
          renderItem={renderItem}
          keyExtractor={(item) => item.uri}
        />

        <Text style={styles.whiteText}>
          Selected files: {currentSelectedUri.length}
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={serverUrl}
          placeholder="https://"
          keyboardType="default"
        />

        <Pressable
          disabled={!canSend}
          style={canSend ? styles.button : styles.buttonDisabled}
          onPress={uploadDocument}
        >
          <Text style={canSend ? styles.buttonText : styles.buttonTextDisabled}>
            Upload log
          </Text>
        </Pressable>

        {/* CUSTOM ALERTS */}
        <CustomAlert
          isShowing={showDeleteAlert}
          title={"Delete File"}
          message={"Are you sure you want to delete this file?"}
          cancelText={"Cancel"}
          confirmText={"Delete"}
          confirmButtonColor={"#DD6B55"}
          showCancelButton={true}
          onCancel={() => {
            setShowDeleteAlert(false);
          }}
          onConfirm={() => {
            deleteDocument();
            setShowDeleteAlert(false);
          }}
        />
        <CustomAlert
          isShowing={showSuccessAlert}
          title={"Files successfully uploaded"}
          message={"Your files are now securely stored on " + serverUrl}
          confirmText={"Perfect"}
          confirmButtonColor={"#74A57F"}
          showCancelButton={false}
          onCancel={() => {
            setShowSuccessAlert(false);
          }}
          onConfirm={() => {
            setShowSuccessAlert(false);
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
    backgroundColor: "#3b4053",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#3b4053",
    borderWidth: 1,
    borderRadius: 8,
    color: "white",
    marginBottom: 8,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 0,
    backgroundColor: "#0496FF",
  },
  buttonDisabled: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 0,
    backgroundColor: "#3B4053",
  },
  buttonText: {
    color: "white",
  },
  buttonTextDisabled: {
    color: "grey",
  },
  whiteText: {
    color: "white",
  },
});

export default LogScreen;
