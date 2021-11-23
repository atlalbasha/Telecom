import React from "react";
import { StyleSheet, View } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";

const CustomAlert = ({
  isShowing,
  title,
  message,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  showCancelButton,
  confirmButtonColor,
}) => {
  return (
    <View>
      <AwesomeAlert
        show={isShowing}
        showProgress={false}
        title={title}
        message={message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={showCancelButton}
        showConfirmButton={true}
        cancelText={cancelText}
        confirmText={confirmText}
        confirmButtonColor={confirmButtonColor}
        onCancelPressed={() => {
          {
            onCancel();
          }
        }}
        onConfirmPressed={() => {
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
