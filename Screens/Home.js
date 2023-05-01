import { View, Text, StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// icon imports
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { PostsScreen } from "./mainScreen/PostsScreen";
import { ProfileScreen } from "./mainScreen/ProfileScreen";
import { CreatePostsScreen } from "./mainScreen/CreatePostsScreen";

const Tab = createBottomTabNavigator();

export const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: 10,
        },
        tabBarStyle: {
          position: "absolute",
          height: 83,
        },
        tabBarActiveBackgroundColor: "#FF6C00",
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              color = "#FFFFFF";
            }
            return <Ionicons name="grid-outline" size={size} color={color} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              color = "#FFFFFF";
            }
            return <AntDesign name="plus" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              color = "#FFFFFF";
            }
            return <Feather name="user" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
