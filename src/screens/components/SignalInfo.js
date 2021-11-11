import { stopLocationUpdatesAsync } from "expo-location";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarChart, Grid } from "react-native-svg-charts";

const SignalInfo = ({ strength, frequency }) => {
  const color = "rgb(116, 165, 127)";

  const [data, setData] = useState([]);
  const newArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  useEffect(() => {
    const interval = setInterval(() => {
      checkData();
      let rNumber = Math.floor(Math.random() * 100) + 1;
      newArray.push(rNumber);
      setData(newArray);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  function checkData() {
    if (newArray.length >= 20) {
      newArray.shift();
    }
  }

  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.text}>
          Signal ({(frequency / 1000).toFixed(1)} GHz)
        </Text>
      </View>
      <View>
        <Text style={styles.textBig}>{strength}%</Text>
      </View>
      <BarChart
        style={{ height: 100 }}
        data={data}
        svg={{ fill: color }}
        contentInset={{ top: 8, bottom: 8 }}
      >
        <Grid belowChart={true} />
      </BarChart>
    </View>
  );
};

export default SignalInfo;

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
