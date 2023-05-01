import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
  Text,
  Keyboard,
} from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import { StyledButton } from "../assets/components/Button";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const onSubmit = () => {
    Keyboard.dismiss();
    console.log(`email: ${email} ; password: ${password}`);
    setEmail("");
    setPassword("");
    navigation.navigate("Home");
  };

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign in</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.inputWrapper}>
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
        <StyledButton value={"Sign in"} onPressFnc={onSubmit}></StyledButton>

        <Text
          onPress={() => navigation.navigate("Registration")}
          style={styles.link}
        >
          don't have an account? Sign up
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "auto",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
  },
  header: {
    textAlign: "center",
    marginBottom: 33,
    marginTop: 32,
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
    color: "#212121",
    fontSize: 16,
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
