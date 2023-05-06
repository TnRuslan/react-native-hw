import { useEffect } from "react";

import { useRoute } from "../../router";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { authStateChanged } from "../../redux/auth/authOperations";
import { auth } from "../../firebase/config";

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChanged(auth));
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
