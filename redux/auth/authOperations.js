import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { updateUser } from "./authSlice";

export const signUp =
  (auth, email, password, login) => async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(user, {
        displayName: login,
      });

      const respons = {
        userId: user.uid,
        userName: user.displayName,
      };

      dispatch(updateUser.updateUserProfile(respons));
    } catch (error) {
      console.log(error.message);
    }
  };

export const logOut = (auth) => async (dispatch, getState) => {
  try {
    const result = await signOut(auth);
    console.log(result);
    dispatch(updateUser.authSignOut());
  } catch (error) {
    console.log(error.message);
  }
};

export const signIn = (auth, email, password) => async (dispatch, getState) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    const currentUser = {
      userId: user.uid,
      userName: user.displayName,
    };

    dispatch(updateUser.updateUserProfile(currentUser));
  } catch (error) {
    console.log(error.message);
  }
};

export const authStateChanged = (auth) => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUpdateProfile = {
          userId: user.uid,
          userName: user.displayName,
        };

        dispatch(updateUser.authStateChange({ stateChange: true }));
        dispatch(updateUser.updateUserProfile(userUpdateProfile));
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
