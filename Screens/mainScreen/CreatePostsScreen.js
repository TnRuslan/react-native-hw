import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

export const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const titleHandler = (text) => setPostTitle(text);
  const placeHandler = (text) => setPlace(text);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");

      let { status: respons } =
        await Location.requestForegroundPermissionsAsync();
      if (respons !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    setPhoto(photo.uri);
    setLocation(location.coords);
  };

  const postPhoto = () => {
    navigation.navigate("PostsScreen", { photo, postTitle, place, location });
    setPhoto("");
    setPostTitle("");
    setPlace("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Create Post</Text>
          </View>
          <View style={styles.cameraWrp}>
            <Camera style={styles.camera} ref={setCamera}>
              {photo && (
                <View style={styles.takePhotoContainer}>
                  <Image source={{ uri: photo }} style={styles.preview} />
                </View>
              )}

              <TouchableOpacity style={styles.cameraBtn} onPress={takePhoto}>
                <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </Camera>
          </View>

          <View style={styles.inputWrp}>
            <Text>Upload photo</Text>

            <TextInput
              style={styles.input}
              placeholder="Title"
              value={postTitle}
              onChangeText={titleHandler}
            />
            <TextInput
              style={styles.input}
              placeholder="Place"
              value={place}
              onChangeText={placeHandler}
            />

            <TouchableOpacity style={styles.publishBtn} onPress={postPhoto}>
              <Text style={styles.btnText}>Publish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
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
  cameraWrp: {
    marginTop: 32,
    marginBottom: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  cameraBtn: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderWidth: 1,
    borderColor: "red",
  },
  preview: {
    height: 200,
    width: 200,
  },
  inputWrp: {
    marginHorizontal: 16,
  },
  input: {
    marginTop: 48,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  publishBtn: {
    height: 51,
    borderRadius: 50,
    marginTop: 32,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#FFF",
    fontSize: 16,
  },
});
