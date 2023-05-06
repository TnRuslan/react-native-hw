import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import { getHeaderTitle } from "@react-navigation/elements";

import { PostsScreen } from "./PostsScreen";
import { CommentsScreen } from "../CommentsScreen";
import { MapScreen } from "../MapScreen";
import { Header } from "../../assets/components/Header";

export const DefaulScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          header: ({ navigation, route, options, back }) => {
            const title = getHeaderTitle(options, route.name);

            return (
              <Header
                title={title}
                navigation={navigation}
                route={route}
                options={options}
                back={back}
                logOutBtn
              />
            );
          },
        }}
      />
      <Stack.Screen name="CommentsScreen" component={CommentsScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
};
