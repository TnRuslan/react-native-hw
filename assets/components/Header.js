import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { logOut } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase/config";

export const Header = ({
  navigation,
  title,
  route,
  options,
  back,
  logOutBtn,
}) => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(logOut(auth));
  };
  return (
    <View style={styles.header}>
      {back && (
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      )}
      <Text style={styles.headerText}>{title}</Text>
      {logOutBtn && (
        <TouchableOpacity style={styles.logOutIcon} onPress={signOut}>
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    height: 88,
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
  },
  headerText: {
    fontSize: 17,
  },
  logOutIcon: {
    position: "absolute",
    right: 16,
    bottom: 12,
  },
});
