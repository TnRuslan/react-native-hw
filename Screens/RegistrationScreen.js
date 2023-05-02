import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import { StyledButton } from "../assets/components/Button";

export const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [login, setLogin] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginHandler = (text) => setLogin(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  const onSubmit = () => {
    Keyboard.dismiss();
    console.log(`login: ${login}; email: ${email} ; password: ${password}`);
    setLogin("");
    setEmail("");
    setPassword("");
    navigation.navigate("Home");
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      console.log(result);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <ImageBackground
      style={styles.bgImage}
      source={require("../assets/bg-mountains.jpg")}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.avatarWrp}>
            <TouchableOpacity
              style={styles.avatarBtn}
              onPress={pickImageAsync}
            ></TouchableOpacity>
            <AntDesign
              style={styles.addIcon}
              name="pluscircleo"
              size={20}
              color="#FF6C00"
            />
          </View>
          <Text style={styles.header}>Registration</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="login"
                value={login}
                onChangeText={loginHandler}
                onFocus={() => setIsShowKeyboard(true)}
                onBlur={() => setIsShowKeyboard(false)}
              />
              <TextInput
                style={styles.input}
                placeholder="email"
                value={email}
                onChangeText={emailHandler}
                onFocus={() => setIsShowKeyboard(true)}
                onBlur={() => setIsShowKeyboard(false)}
              />
              <TextInput
                textContentType="password"
                secureTextEntry={true}
                style={styles.input}
                placeholder="password"
                value={password}
                onChangeText={passwordHandler}
                onFocus={() => setIsShowKeyboard(true)}
                onBlur={() => setIsShowKeyboard(false)}
              />
            </View>
          </KeyboardAvoidingView>
          <StyledButton value={"Sign up"} onPressFnc={onSubmit}></StyledButton>

          <Text
            onPress={() => navigation.navigate("Login")}
            style={{ ...styles.link, marginBottom: isShowKeyboard ? -100 : 32 }}
          >
            Do you already have an account? Sign in
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    // height: 400,
    marginTop: "auto",
    // marginBottom: 0,
    // flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
  },
  avatarWrp: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: "translateX(-40px)",
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  avatarBtn: {
    height: "100%",
    borderRadius: 16,
    backgroundColor: "transparent",
  },
  addIcon: {
    position: "absolute",
    right: -10,
    bottom: 14,
  },
  header: {
    textAlign: "center",
    marginBottom: 33,
    marginTop: 92,
    fontFamily: "Roboto_500Medium",
    fontSize: 30,
  },
  inputWrapper: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    height: 50,
    padding: 16,
    backgroundColor: "#F6F6F6",
    color: "#BDBDBD",
    fontFamily: "Roboto_400Regular",
  },
  link: {
    marginBottom: 32,
    textAlign: "center",
    fontSize: 16,
    color: "#1B4371",
    fontFamily: "Roboto_400Regular",
  },
});
