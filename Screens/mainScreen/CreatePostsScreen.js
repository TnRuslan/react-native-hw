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
  ScrollView,
} from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";

import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

export const CreatePostsScreen = ({ navigation }) => {
  const { userId, userName } = useSelector((state) => state.auth);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState(null);

  const titleHandler = (text) => setPostTitle(text);
  const placeHandler = (text) => setPlace(text);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      console.log(status === "granted");

      let { status: respons } =
        await Location.requestForegroundPermissionsAsync();
      if (respons !== "granted") {
        console.log("Permission to access location was denied");
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

  const uploadPhoto = async () => {
    const respons = await fetch(photo);
    const file = await respons.blob();
    const postId = Date.now().toString();

    const storageRef = ref(storage, `posts/${postId}`);

    const uploaded = await uploadBytes(storageRef, file);

    const photoUrl = await getDownloadURL(uploaded.ref);

    return photoUrl;
  };

  const uploadPost = async () => {
    const photoUrl = await uploadPhoto();
    const post = { photoUrl, postTitle, place, location, userId, userName };

    try {
      const docRef = await addDoc(collection(db, "posts"), post);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const postPhoto = async () => {
    uploadPost();
    navigation.navigate("PostsScreen");
    setPhoto("");
    setPostTitle("");
    setPlace("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <ScrollView style={styles.container}>
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

            <TouchableOpacity
              style={styles.publishBtn}
              onPress={postPhoto}
              // onPress={uploadPhoto}
            >
              <Text style={styles.btnText}>Publish</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    marginBottom: 100,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#FFF",
    fontSize: 16,
  },
});
