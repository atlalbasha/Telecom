import React from "react";
import { StyleSheet, View } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";

const CustomAlert = ({ isShowing, title, message, onCancel, onConfirm }) => {
  return (
    <View>
      <AwesomeAlert
        show={isShowing}
        showProgress={false}
        title={title}
        message={message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, delete it"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          //   setShowAlert(false);
          {
            onCancel();
          }
        }}
        onConfirmPressed={() => {
          //   deleteDocument();
          //   setShowAlert(false);
          {
            onConfirm();
          }
        }}
      />
    </View>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({});
