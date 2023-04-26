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
  Image,
} from "react-native";
import { StyledButton } from "../assets/components/Button";

export const RegistrationScreen = () => {
  const [login, setLogin] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginHandler = (text) => setLogin(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const onSubmit = () => {
    Keyboard.dismiss();
    console.log(`login: ${login}; email: ${email} ; password: ${password}`);
    setLogin("");
    setEmail("");
    setPassword("");
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    console.log("image");
    if (!result.canceled) {
      console.log(result);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.avatarWrp}>
          <TouchableOpacity
            style={styles.avatarBtn}
            onPress={pickImageAsync}
          ></TouchableOpacity>
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
            />
            <TextInput
              style={styles.input}
              placeholder="email"
              value={email}
              onChangeText={emailHandler}
            />
            <TextInput
              textContentType="password"
              secureTextEntry={true}
              style={styles.input}
              placeholder="password"
              value={password}
              onChangeText={passwordHandler}
            />
          </View>
          <StyledButton value={"Sign up"} onPressFnc={onSubmit}></StyledButton>
          <Text style={styles.link}>
            Do you already have an account? Sign in
          </Text>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    // height: 400,
    marginTop: "auto",
    // flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
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
  AaddBtn: {
    width: 20,
    height: 20,
  },
  header: {
    textAlign: "center",
    marginBottom: 33,
    marginTop: 92,

    fontSize: 30,
    fontWeight: 500,
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
  },
  link: {
    marginBottom: 32,
    textAlign: "center",
    fontSize: 16,
    color: "#1B4371",
  },
});
