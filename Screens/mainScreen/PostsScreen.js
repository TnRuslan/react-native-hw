import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
//icom import
import { EvilIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

export const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Image source={{ uri: item.photo }} style={styles.image} />
        <Text style={styles.postTitle}>{item.postTitle}</Text>
        <View style={styles.postInfo}>
          <TouchableOpacity
            style={styles.commentWrp}
            onPress={() => navigation.navigate("CommentsScreen")}
          >
            <EvilIcons name="comment" size={18} color="#BDBDBD" />
            <Text>0</Text>
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
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Posts</Text>
        <TouchableOpacity
          style={styles.logOutIcon}
          onPress={() => navigation.navigate("Login")}
        >
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View> */}

      <FlatList
        style={styles.itemContainer}
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
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
