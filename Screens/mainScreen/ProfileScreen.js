import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

import {
  query,
  collection,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const ProfileScreen = ({ navigation }) => {
  const { userId } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);

  const getUserPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));

    onSnapshot(q, (doc) => {
      setUserPosts(doc.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Image source={{ uri: item.photoUrl }} style={styles.image} />
        <Text style={styles.postTitle}>{item.postTitle}</Text>
        <View style={styles.postInfo}>
          <TouchableOpacity
            style={styles.commentWrp}
            onPress={() => navigation.navigate("CommentsScreen", item)}
          >
            <EvilIcons name="comment" size={18} color="#BDBDBD" />
            <Text>comments</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.locationWrp}
            onPress={() =>
              navigation.navigate("MapScreen", { location: item.location })
            }
          >
            <SimpleLineIcons name="location-pin" size={18} color="#BDBDBD" />
            <Text style={styles.locationText}>{item.place}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.itemContainer}
        data={userPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
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
  itemContainer: {
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  item: {
    marginBottom: 34,
    width: "100%",
  },
  image: {
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  postTitle: {
    marginBottom: 11,
    fontSize: 16,
    fontWeight: "500",
  },
  postInfo: {
    flex: 1,
    flexDirection: "row",
  },
  commentWrp: {
    flex: 1,
    gap: 9,
    flexDirection: "row",
  },
  locationWrp: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 9,
    marginLeft: "auto",
  },
  locationText: {
    fontSize: 16,
    color: "#212121",
    textDecorationLine: "underline",
  },
});
