import React from "react";
import { StyleSheet, Text, View } from "react-native";

const NetworkInfo = ({
  type,
  isConnected,
  isInternetReachable,
  isWifiEnabled,
  ssid,
  ipAddress,
  subnet,
}) => {
  return (
    <View style={styles.column}>
      <View>
        <Text style={styles.text}>Connection type: {type}</Text>
      </View>
      <View style={styles.row}>
        <View>
          <Text style={styles.text}>Active network connection: </Text>
        </View>
        <View>
          <Text
            style={[
              styles.text,
              isConnected ? { color: "#74A57F" } : { color: "#db3a34" },
            ]}
          >
            {isConnected}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Text style={styles.text}>Internet is reachable: </Text>
        </View>
        <View>
          <Text
            style={[
              styles.text,
              isInternetReachable ? { color: "#74A57F" } : { color: "#db3a34" },
            ]}
          >
            {isInternetReachable}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Text style={styles.text}>WiFi is reachable (Android only): </Text>
        </View>
        <View>
          <Text
            style={[
              styles.text,
              isWifiEnabled ? { color: "#74A57F" } : { color: "#db3a34" },
            ]}
          >
            {isWifiEnabled}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.text}>SSID: {ssid}</Text>
      </View>
      <View>
        <Text style={styles.text}>IP-Address: {ipAddress}</Text>
      </View>
      <View>
        <Text style={styles.text}>Subnet: {subnet}</Text>
      </View>
    </View>
  );
};

export default NetworkInfo;

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#3b4053",
    borderRadius: 8,
  },
  row: {
    flexDirection: "row",
  },
  text: {
    color: "white",
  },
  textGreen: {
    color: "#74A57F",
  },
  textRed: {
    color: "#db3a34",
  },
  textBig: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#74A57F",
  },
});
