import { StyleSheet, Text, TouchableOpacity } from "react-native";
export const StyledButton = ({ value, onPressFnc }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.button}
      onPress={onPressFnc}
    >
      <Text style={styles.btnText}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 100,
    padding: 15,
    marginTop: 43,
    marginBottom: 16,
    alignItems: "center",
    backgroundColor: "#FF6C00",
  },
  btnText: {
    color: "#ffffff",
    fontSize: 16,
  },
});
