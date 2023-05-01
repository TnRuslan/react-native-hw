import { NavigationContainer } from "@react-navigation/native";
// import { useRoute } from "./router";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
// icon imports
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";
import { Home } from "./Screens/Home";

const Stack = createNativeStackNavigator();

// export default function App() {
//   const routing = useRoute(true);
//   return <NavigationContainer>{routing}</NavigationContainer>;
// }

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
