import {
  ImageBackground,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          style={styles.bgImage}
          source={require("./assets/bg-mountains.jpg")}
        >
          <RegistrationScreen></RegistrationScreen>
          {/* <LoginScreen></LoginScreen> */}
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: "center",
    // position: "absolute",
    // alignItems: "center",
  },
});
