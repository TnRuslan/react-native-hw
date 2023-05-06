import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// icon imports
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
// screen imports
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";
import { PostsScreen } from "./Screens/mainScreen/PostsScreen";
import { ProfileScreen } from "./Screens/mainScreen/ProfileScreen";
import { CreatePostsScreen } from "./Screens/mainScreen/CreatePostsScreen";
import { Home } from "./Screens/Home";
import { DefaulScreen } from "./Screens/mainScreen/DefaultSceen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: 10,
        },
        tabBarStyle: {
          // position: "absolute",
          height: 83,
        },
        tabBarActiveBackgroundColor: "#FF6C00",
      }}
    >
      <Tab.Screen
        name="Default"
        component={DefaulScreen}
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
          headerShown: false,
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
