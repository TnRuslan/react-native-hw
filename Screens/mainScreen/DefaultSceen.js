import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import { PostsScreen } from "./PostsScreen";
import { CommentsScreen } from "../CommentsScreen";
import { MapScreen } from "../MapScreen";

export const DefaulScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PostsScreen" component={PostsScreen} />
      <Stack.Screen name="CommentsScreen" component={CommentsScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
};
