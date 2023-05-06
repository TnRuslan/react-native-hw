import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { doc, collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const CommentsScreen = ({ route }) => {
  const { userName, userId } = useSelector((state) => state.auth);
  const { id, photoUrl } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const commentHandler = (text) => setComment(text);

  const addComment = async () => {
    setComment("");
    const docRef = doc(db, "posts", id);
    const updated = await addDoc(collection(docRef, "comments"), {
      comment,
      userId,
      userName,
    });
  };

  const getAllComments = async () => {
    onSnapshot(collection(db, "posts", id, "comments"), (doc) => {
      setAllComments(doc.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <View style={[styles.commentItem]}>
        <View>
          <Text>{item.userName || "Login"}</Text>
        </View>
        <View>
          <Text>{item.comment}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: photoUrl }} style={styles.image} />
      </View>

      <FlatList
        data={allComments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.inputWrp}>
        <TextInput
          style={styles.input}
          placeholder="Add comment"
          value={comment}
          onChangeText={commentHandler}
        />
        <TouchableOpacity style={styles.btn} onPress={addComment}>
          <AntDesign name="arrowup" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  commentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    padding: 10,
  },
  btn: {
    position: "absolute",
    right: 5,
    top: 0,
    width: 34,
    height: 34,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
  },
  image: {
    height: 240,
    borderRadius: 8,
    marginBottom: 20,
  },
  inputWrp: {
    position: "relative",
    marginTop: 20,
    marginBottom: 30,
  },
  input: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
});
