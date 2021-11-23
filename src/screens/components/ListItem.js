import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ListItem = ({
  uri,
  filename,
  size,
  type,
  isSelected,
  onDelete,
  onClick,
}) => {
  const [selected, setSelected] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setSelected(!selected);
        onClick(uri);
      }}
    >
      <View style={selected ? styles.rowSelected : styles.row}>
        <View>
          <Ionicons name="document-text-outline" size={32} color="white" />
        </View>
        <View style={styles.column}>
          <Text style={styles.whiteText}>{filename}</Text>
          <Text style={styles.whiteText}>{size} bytes</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              onDelete();
            }}
          >
            <Ionicons name="close-outline" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    padding: 8,
    backgroundColor: "#3b4053",
    borderRadius: 8,
  },
  rowSelected: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    padding: 8,
    backgroundColor: "#3b4053",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0496FF",
  },
  column: {
    flexDirection: "column",
  },
  whiteText: {
    color: "white",
  },
});
