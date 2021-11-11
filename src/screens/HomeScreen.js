import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapScreen from "./MapScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import netInfoApi from "./shared/api/netinfo";
import * as Location from "expo-location";
import NetInfo from "@react-native-community/netinfo";
import SignalInfo from "./components/SignalInfo";
import NetworkInfo from "./components/NetworkInfo";
import LocationInfo from "./components/LocationInfo";

const HomeScreen = ({ navigation }) => {
  const [netInfoData, setNetInfoData] = useState();

  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(async () => {
    console.log(await netInfoApi());
    NetInfo.addEventListener((state) => {
      setNetInfoData(state);
    });

    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMessage("Permission to access location was denied");
      return;
    }
    await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.BestForNavigation },
      (value) => {
        setLocation(value);
      }
    );
  }, []);

  let text = "Waiting...";
  if (errorMessage) {
    text = errorMessage;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.textHeader}>TeleCom</Text>
        <SignalInfo
          strength={netInfoData?.details.strength}
          frequency={netInfoData?.details.frequency}
        />
        <NetworkInfo
          type={netInfoData?.type}
          isConnected={netInfoData?.isConnected.toString()}
          isInternetReachable={netInfoData?.isInternetReachable.toString()}
          isWifiEnabled={netInfoData?.isWifiEnabled.toString()}
          ssid={netInfoData?.details.ssid}
          ipAddress={netInfoData?.details.ipAddress}
          subnet={netInfoData?.details.subnet}
        />
        <LocationInfo
          latitude={location?.coords.latitude}
          longitude={location?.coords.longitude}
          accuracy={location?.coords.accuracy}
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
  textHeader: {
    color: "white",
    fontSize: 40,
    marginBottom: 8,
  },
});

export default HomeScreen;
