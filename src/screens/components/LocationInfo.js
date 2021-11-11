import React from "react";
import { StyleSheet, Text, View } from "react-native";

const LocationInfo = ({ latitude, longitude, accuracy }) => {
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.text}>Latitude: {latitude}°</Text>
        <Text style={styles.text}>Longitude: {longitude}°</Text>
        <Text style={styles.text}>Accuracy: {accuracy?.toFixed(1)} meters</Text>
      </View>
    </View>
  );
};

export default LocationInfo;

const styles = StyleSheet.create({
  row: {
    flexDirection: "column",
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#3b4053",
    borderRadius: 8,
  },
  text: {
    color: "white",
  },
  textBig: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#74A57F",
  },
});
