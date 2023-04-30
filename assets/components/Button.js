import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";

export const StyledButton = ({ value, onPressFnc }) => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
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
    fontFamily: "Roboto_400Regular",
    color: "#ffffff",
    fontSize: 16,
  },
});
